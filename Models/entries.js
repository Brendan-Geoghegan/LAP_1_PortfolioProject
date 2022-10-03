const path = require("path")
const fs = require("fs")
const filePath = '../data.json"'
console.log(path);

class Entry {
    constructor(data) {
        this.id = data.id;
        this.entry = data.entry;
        this.comments = data.comments;
        this.reactions = data.reactions;
        this.gif = data.gif;
    }
    static get all() {
        // const entries = data.map((entry) => new Entry(entry))
        fs.readFile(filePath, (err, data) => {
            if(err) {
              console.log("something went wrong");
              console.log(err);
              return err
            } else {
              const obj = JSON.parse(data)
              console.log(obj);
              return obj
            }
          })
    }
}

module.exports = Entry;
