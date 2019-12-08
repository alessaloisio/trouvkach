/* becodeorg/trouvkach
 *
 * /src/server/database.js - Database Middleware Connection
 *
 * coded by alessio@Devarings
 * started at 06/12/2019
 */

import {MongoClient} from "mongodb";
import assert from "assert"; //assert can stop a function if we have error

let db;

const database = (req, _res, next) => {
    // Database already exist
    if (db) {
        req.db = db;
        next();
        return;
    }

    // First Connection to db
    const url = process.env.URL || "mongodb://dev:dev@mongo:27017";
    const dbName = process.env.DBNAME || "trouvkash";

    MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        assert.equal(null, err);

        db = client.db(dbName);
        req.db = client.db(dbName);

        next();
    });
};

export default database;
