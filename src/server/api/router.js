import {Router} from "express";

import banks from "./banks";
import geoTerminals from "./geo-terminals";

const router = new Router();

// Version
router.get("/", (_req, res) => {
    res.json({
        version: "0.0.1",
    });
});

router.use("/banks", banks);

router.get("/terminals/:latitude,:longitude,:zoom/:search*?", geoTerminals);

export default router;
