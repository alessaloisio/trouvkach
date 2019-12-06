import {MongoClient} from "mongodb";
import assert from "assert";

const database = () =>
    new Promise(resolve => {
        const url = process.env.URL || "mongodb://dev:dev@mongo:27017";
        const dbName = process.env.DBNAME || "trouvkash";

        MongoClient.connect(url, (err, client) => {
            assert.equal(null, err);
            resolve(client.db(dbName));
        });
    });

export default database;
