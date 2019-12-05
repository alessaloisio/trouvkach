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

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
