/* becodeorg/trouvkach
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode
 * started at 06/09/2019
 */

import express from "express";
import path from "path";

const {APP_PORT} = process.env;

const app = express();

// MONGODB
const mongo = require("mongodb").MongoClient;
//assert sert a stopper la fonction en cas d'erreur.
const assert = require("assert");

const url = "mongodb://dev:dev@mongo:27017";
const dbName = "trouvkash";

const getDb = () =>
    new Promise(resolve => {
        mongo.connect(url, (err, client) => {
            //assert -> permet d' arreter la fonction si il y a une erreur
            assert.equal(null, err);
            console.log("Connected successfully to server");

            resolve(client.db(dbName));
        });
    });

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.get("/hello", (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) ${req}`);
    res.send("coucou les amis");
});

app.get("/api/banks", async (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);

    const db = await getDb();

    // Banks
    const Banks = db.collection("banks");
    // eslint-disable-next-line no-shadow
    Banks.find({}).toArray((err, docs) => {
        assert.equal(null, err);
        res.send({
            data: docs,
        });
    });
});

app.get("/api/terminals/:latitude,:longitude,:zoom", async (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);
    const db = await getDb();

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
});

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
