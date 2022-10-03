const express = require("express");
const Entry = require("../Models/entries");
const router = express.Router();

router.get("/", (req, res) => {
    const entry = Entry.all;
    res.send(entry);
})

router.get("/:id", (req,res) => {
    try {
        const entryId = parseInt(req.params.id);
        const selectedEntry = Entry.findById(entryId);
        res.send(selectedEntry);
    } catch (err) {
        console.log(err);
        res.status(404).send({message: err.message})
    }
})

// router.post()

module.exports = router;
