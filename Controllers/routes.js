const express = require("express")
const router = express.Router()
const Entry = require('../Models/entries')


module.exports = router
// function jsonReader(filePath, cb) {
//     fs.readFile(filePath, (err, fileData) => {
//         if (err) {
//         return cb && cb(err);
//         }
//         try {
//         const object = JSON.parse(fileData);
//         // console.log(1, object,);
//         return cb && cb(null, object);
//         } catch (err) {
//         return cb && cb(err);
//         }
//     });
// }

// obtain all data
router.get("/", (req, res) => {
    console.log("hitting main route for entries");
    const entries = Entry.all
    console.log(1, entries);
    res.send(entries);
})

router.get("/:id", (req,res) => {
    const entry = Entry.findById(parseInt(req.params.id))
    res.send(entry);
})

router.post('/', (req, res) => {
    console.log("create element route");
    const data = req.body;
    console.log(data);
    const newEntry = Entry.create(data);
    res.status(201).send(newEntry);
})
router.delete('/:id', (req, res) => {
    const entryId = parseInt(req.params.id);
    const entryToDestroy = Entry.findById(entryId);
    entryToDestroy.destroy();
    res.status(204).send();
})

// router.post()

module.exports = router;

