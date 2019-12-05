/* becodeorg/trouvkach
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode
 * started at 06/09/2019
 */
//express framework permet de créé serveur node js
import express from "express";
import path from "path";

const mongoose = require("mongoose");

const {APP_PORT} = process.env;

const app = express();

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.get("/hello", (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);
    res.send("Hello, World!");
});

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);

const mongo = mongoose.connect("mongodb://dev:dev@mongo:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

console.log(mongo);
