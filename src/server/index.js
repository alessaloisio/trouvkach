/* becodeorg/trouvkach
 *
 * /src/server/index.js - Server entry point
 *
 * coded by alessio@Devarings
 * started at 06/12/2019
 */

import path from "path";
import express from "express";

import database from "./database";
import apiRoutes from "./api/router";

const app = express();

// Send client static files (React App)
app.use(express.static(path.resolve(__dirname, "../../bin/client")));

// Mongo DB
app.use(database);

// Api Router
app.use("/api", apiRoutes);

// Start Server
app.listen(process.env.PORT, () =>
    // eslint-disable-next-line no-console
    console.log(`🚀 Server is listening on port ${process.env.PORT}.`),
);
