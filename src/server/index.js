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

mongo.connect(url, (err, client) => {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // Banks
    const Banks = db.collection("banks");
    // eslint-disable-next-line no-shadow
    Banks.find({}).toArray((err, docs) => {
        assert.equal(null, err);
        console.log("Found the following records");
        console.log(docs);
    });

    // Terminals
    const Terminals = db.collection("terminals");
    // eslint-disable-next-line no-shadow
    Terminals.find({}).toArray((err, docs) => {
        assert.equal(null, err);
        console.log("Found the following records");
        console.log(docs);
    });

    // client.close();
});

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.get("/hello", (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);
    res.send("Hello, World!");
});

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
