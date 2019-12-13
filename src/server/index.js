/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* becodeorg/trouvkach
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode
 * started at 06/09/2019
 * aggregate
 *
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
        mongo.connect(
            url,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            },
            (err, client) => {
                //assert -> permet d' arreter la fonction si il y a une erreur
                assert.equal(null, err);
                console.log("Connected successfully to server");

                resolve(client.db(dbName));
            },
        );
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

app.get("/api/terminals", async (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);

    const db = await getDb();

    // Terminals
    const Terminals = db.collection("terminals");
    // eslint-disable-next-line no-shadow
    Terminals.find({}).toArray((err, docs) => {
        assert.equal(null, err);
        res.json({
            data: docs,
        });
    });
});
/*
app.get("/api/terminals/:longitude-:latitude", async (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);

    const longitude = req.params.longitude;
    const latitude = req.params.latitude;

    const db = await getDb();

    // Terminals
    const Terminals = db.collection("terminals");
    // eslint-disable-next-line no-shadow
    console.log("Wesh les khouyas et les khouyettes");

    // const aroundTerminals = Terminals.find( { loc: { $geoWithin: { $centerSphere: [ [ longitude, latitude ] ,
    //     100 / 3963.2 ] } } } )
    // console.log('wesh les terminaux',aroundTerminals)

    const terminaux = await Terminals.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [parseFloat(longitude), parseFloat(latitude)],
                },
                distanceField: "dist.calculated",
                maxDistance: 2000,
            },
        },
        {$limit: 5000},
    ]).toArray();

    console.log("Wesh les thunes ", terminaux);
}); */

/* navigator.geolocation.watchPosition(pos => {
    console.log(pos.coords.latitude , pos.coords.longitude)}) */

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
