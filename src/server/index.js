/* becodeorg/trouvkach
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode
 * started at 06/09/2019
 *
 * coded by alessio@Devarings
 * started at 06/12/2019
 */

import path from "path";
import assert from "assert"; //assert sert a stopper la fonction en cas d'erreur.
import express from "express";
import Database from "./database";

const {APP_PORT} = process.env;
const app = express();

// Mongo DB
let db = Database().then(data => {
    db = data;
});

// Node.js Server Config + Router
app.use(express.static(path.resolve(__dirname, "../../bin/client")))

    .get("/api/banks", (req, res) => {
        // Banks
        const Banks = db.collection("banks");
        // eslint-disable-next-line no-shadow
        Banks.find({}).toArray((err, docs) => {
            assert.equal(null, err);
            res.send({
                data: docs,
            });
        });
    })

    .get("/api/terminals/:latitude,:longitude,:zoom", async (req, res) => {
        const longitude = parseFloat(req.params.longitude) || 50.6593305;
        const latitude = parseFloat(req.params.latitude) || 5.5995275;
        const zoom = parseFloat(req.params.zoom) || 1;

        // Terminals
        const Terminals = db.collection("terminals");

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
                $project: {
                    bank: 1,
                    address: 1,
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
                    distance: {$lte: zoom},
                },
            },
        ])
            .sort({
                distance: 1,
            })
            .toArray();

        // Send to client
        res.json({
            data: terminals,
        });
    })

    .listen(APP_PORT, () =>
        // eslint-disable-next-line no-console
        console.log(`🚀 Server is listening on port ${APP_PORT}.`),
    );
