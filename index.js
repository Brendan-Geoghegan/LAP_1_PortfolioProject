const app = require("./server.js")

require('dotenv').config();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Express is running on port ${port}`));
