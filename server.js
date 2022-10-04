const express = require("express");
const app = express();
const cors =  require("cors");

app.use(cors());
const router = require('./Controllers/routes.js')
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello");
})
app.use('/entries', router)

module.exports = app;
