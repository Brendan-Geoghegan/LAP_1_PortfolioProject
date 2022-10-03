const express = require("express")
const router = express.Router()
const Entry = require('../Models/entries')

// obtain all data
router.get("/", (req, res) => {
  console.log("hitting main route for entries");
  const entries = Entry.all
  console.log(entries);
  
})

module.exports = router