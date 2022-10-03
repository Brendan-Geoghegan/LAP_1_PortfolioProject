const express = require("express");
const app = express();
const data = require("./database/data")
const cors =  require("cors");
app.use(cors());
//  const env = require("dotenv");
require('dotenv').config();

app.get("/", (req, res) => {
    res.send("Hello");
})
app.get("/entries", (req, res) => {
    res.send(data);
})


const port = process.env.PORT || 3000;
// const port = 3000;
app.listen(port, () => console.log(`Express is running on port ${port}`));
