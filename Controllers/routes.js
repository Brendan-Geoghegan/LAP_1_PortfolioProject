const express = require("express")
const router = express.Router()
const Entry = require('../Models/entries')

// obtain all data
router.get("/", (req, res) => {
    const entries = Entry.all
    res.send(entries);
})

router.get("/:id", (req,res) => {
    const entry = Entry.findById(parseInt(req.params.id));
    if(!entry) {
        res.status(404).send("item not found")
    } else {
        res.send(entry);
    }
})

router.post('/', (req, res) => {
    const data = req.body;
    const newEntry = Entry.create(data);
    res.status(201).send(newEntry);
})

// route to add comments
router.patch('/:id/comments', (req,res) => {
    const newComment = req.body.comment
    const entryId = parseInt(req.params.id)
    const updatedEntry = Entry.addAcomment(entryId, newComment)
    res.status(201).send(updatedEntry)
})

router.patch("/:id/reaction", (req, res) => {
    const entry = Entry.findById(parseInt(req.params.id));
    const data =req.body;
    if(!data) {
        res.send("Data not received from client.")
    } else if (!entry) {
        res.status(404).send("id not found")
    } else {
        const id = parseInt(req.params.id);
        const reaction = data.reaction;
        const updatedEntry = Entry.updateReactions(id, reaction);
        res.status(200).send(updatedEntry);
    }
})

router.patch("/:id/gif", (req, res) => {
    const entry = Entry.findById(parseInt(req.params.id));
    if(!entry) {
        res.send("item not found")
    } else {
        const data =req.body;
        const id = parseInt(req.params.id);
        const gif = data.gif;
        const updatedEntry = Entry.updateGif(id, gif);
        res.status(200).send(updatedEntry);
    }
})
router.delete("/:id/delete", (req,res) => {
    console.log("hitting the delete route");
    const id = parseInt(req.params.id);
    Entry.deleteEntry(id);
    res.status(404).send("entry deleted");
})


router.get("/:id/comments", (req, res) => {
    const entry = Entry.findById(parseInt(req.params.id))[0]
    res.send(entry.comments)
})

router.get("/count/:id/:reaction", (req, res) => {
    const entry = Entry.findById(parseInt(req.params.id));
    const reaction = req.params.reaction;

    if(!reaction) {
        res.status(404).send("reaction not found")
    } else if (!entry) {
        res.status(404).send("id not found")
    } else {
        const id = parseInt(req.params.id);
        const reactionCount = Entry.findReactionCountById(id, reaction);
        res.send(reactionCount);
    }
})

module.exports = router;
