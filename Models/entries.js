const data =  require("../data.json");
const fs = require("fs");

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
        return cb && cb(err);
        }
        try {
        const object = JSON.parse(fileData);
        console.log(1, object,);
        return cb && cb(null, object);
        } catch (err) {
        return cb && cb(err);
        }
    });
}

class Entry {
    constructor(data) {
        this.id = data.id;
        this.entry = data.entry;
        this.comments = data.comments;
        this.reactions = data.reactions;
        this.gif = data.gif;
    }
    static get all() {
        console.log("hi");
        jsonReader("./data.json", (err, entries) => {
            if (err) {
                console.log("err");
                return;
            } else {
                console.log(entries);
                console.log("entries");
                return entries;
            }
        });
    }
    // static get all() {
    //     const entries = data.map((entry) => new Entry(entry))
    //     return entries;
    // }
    static findById(id){
        const entry = data.filter((ent) => ent.id == id)[0];
        if (!entry){
            return;
        }
        const newEntry = new Entry(entry);
        return newEntry;
    }
    static create(entry) {
        const newEntryId = data.length + 1;
        const newEntry = new Entry({ id: newEntryId, ...entry});
        data.push(newEntry);
        return newEntry;
    }
    destroy() {
        const entry = data.filter((ent) => ent.id === this.id)[0];
        data.splice(data.indexOf(entry), 1);
    }
}

module.exports = {Entry, jsonReader};
