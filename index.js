const express = require("express");
const app = express();
// const data = require("./database/data")
const cors =  require("cors");
const router = require("./Controllers/routes");
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());


//  const env = require("dotenv");
require('dotenv').config();

app.get("/", (req, res) => {
    res.send("Hello");
})

app.use("/entries", router);


// app.get("/entries", (req, res) => {
//     res.send(data);
// })


const port = process.env.PORT || 3000;
// const port = 3000;
app.listen(port, () => console.log(`Express is running on port ${port}`));
