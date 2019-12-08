import {Router} from "express";
import assert from "assert";

const router = new Router();

router.get("/", (req, res) => {
    const Banks = req.db.collection("banks");

    Banks.find({}).toArray((err, docs) => {
        assert.equal(null, err);
        res.send({
            data: docs,
        });
    });
});

router.get("/:search", (req, res) => {
    const Banks = req.db.collection("banks");

    // Case insensitive, starting with the search string
    const search = new RegExp(`^${req.params.search}`, "i");

    Banks.find({
        name: {
            $in: [search],
        },
    }).toArray((err, docs) => {
        assert.equal(null, err);
        res.send({
            data: docs,
        });
    });
});

export default router;
