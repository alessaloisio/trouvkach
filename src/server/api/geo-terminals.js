// https://wiki.openstreetmap.org/wiki/Zoom_levels
const distancePerPixel = (latitude = 0, zoom = 0) => {
    const C = Math.PI * 2 * 6378137;
    const ranLatitude = (latitude * Math.PI) / 180;
    const sPixel = (C * Math.cos(ranLatitude)) / Math.pow(2, zoom + 8);
    return sPixel;
};

export default async (req, res) => {
    const longitude = parseFloat(req.params.longitude) || 50.6326188;
    const latitude = parseFloat(req.params.latitude) || 5.5854983;
    const zoom = parseInt(req.params.zoom) || 13;
    const distance = distancePerPixel(latitude, zoom);
    const search = req.params.search
        ? new RegExp(`^${req.params.search}`, "i")
        : new RegExp(`.*`, "i");

    // Collections
    const Terminals = req.db.collection("terminals");

    // haversine’ formula
    // https://stackoverflow.com/a/365853
    const terminals = await Terminals.aggregate([
        {
            $addFields: {
                // dLat
                dLat: {
                    $divide: [
                        {
                            $multiply: [
                                {
                                    $subtract: [latitude, "$latitude"],
                                },
                                Math.PI,
                            ],
                        },
                        180,
                    ],
                },

                // dLon
                dLon: {
                    $divide: [
                        {
                            $multiply: [
                                {
                                    $subtract: [longitude, "$longitude"],
                                },
                                Math.PI,
                            ],
                        },
                        180,
                    ],
                },

                // lat1
                lat1: {
                    $divide: [
                        {
                            $multiply: ["$latitude", Math.PI],
                        },
                        180,
                    ],
                },

                // lat 2
                lat2: {
                    $divide: [
                        {
                            $multiply: [latitude, Math.PI],
                        },
                        180,
                    ],
                },
            },
        },
        {
            $addFields: {
                a: {
                    $add: [
                        {
                            $multiply: [
                                {
                                    $sin: {
                                        $divide: ["$dLat", 2],
                                    },
                                },
                                {
                                    $sin: {
                                        $divide: ["$dLat", 2],
                                    },
                                },
                            ],
                        },
                        {
                            $multiply: [
                                {
                                    $cos: "$lat1",
                                },
                                {
                                    $cos: "$lat2",
                                },
                                {
                                    $sin: {
                                        $divide: ["$dLon", 2],
                                    },
                                },
                                {
                                    $sin: {
                                        $divide: ["$dLon", 2],
                                    },
                                },
                            ],
                        },
                    ],
                },
            },
        },
        {
            $addFields: {
                c: {
                    $multiply: [
                        2,
                        {
                            $atan2: [
                                {
                                    $sqrt: "$a",
                                },
                                {
                                    $sqrt: {
                                        $subtract: [1, "$a"],
                                    },
                                },
                            ],
                        },
                    ],
                },
            },
        },
        {
            $lookup: {
                from: "banks",
                localField: "bank",
                foreignField: "_id",
                as: "bank",
            },
        },
        {
            $project: {
                bank: {$arrayElemAt: ["$bank", 0]},
                address: 1,
                longitude: 1,
                latitude: 1,
                distance: {
                    $trunc: [
                        {$divide: [{$multiply: ["$c", 6378137]}, 1000]}, // km
                        2,
                    ],
                },
            },
        },
        {
            $match: {
                distance: {$lte: distance},
                bank: {
                    $exists: true,
                    $ne: null,
                },
                "bank.name": {
                    $in: [search],
                },
            },
        },
    ])
        .sort({
            distance: 1,
        })
        .limit(20)
        .toArray();

    // Send to client
    res.json({
        data: terminals,
    });
};
