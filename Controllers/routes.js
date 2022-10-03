const express = require("express");
const Entry = require("../Models/entries");
const router = express.Router();

router.get("/", (req, res) => {
    const entry = Entry.all;
    res.send(entry);
})
// router.get('/:id', (req,res) => {
//     res.end()
// })

router.post()
