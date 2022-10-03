// const data =  require("../data.json");
const fs = require("fs");
const filePath = "./data.json";

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

class Entry {
    constructor(data) {
        this.id = data.id;
        this.entry = data.entry;
        this.comments = data.comments;
        this.reactions = data.reactions;
        this.gif = data.gif;
    }
    static get all() {
        try {
              const jsonString = fs.readFileSync(filePath, "utf-8");
              const entries = JSON.parse(jsonString);
              console.log(entries);
              return entries;
          } catch (err) {
              console.log(err);
          }
      
    }
    static findById(id) {
    //   try {
    //     const jsonString = fs.readFileSync(filePath, "utf-8");
    //     const entries = JSON.parse(jsonString);
    //     console.log(entries);
    //     return entries[id];
    // } catch (err) {
    //     console.log(err);
    // }
    return Entry.all[id];
    }
    // static findById(id){
    //     const entry = data.filter((ent) => ent.id == id)[0];
    //     if (!entry){
    //         return;
    //     }
    //     const newEntry = new Entry(entry);
    //     return newEntry;
    // }

    static create(entry) {
      console.log("creating a new element");
      const allEntries = Entry.all
      const newEntryId = allEntries[allEntries.length - 1].id + 1;
      const newEntry = new Entry({ id: newEntryId, ...entry});
      console.log(1, newEntry);
      allEntries.push(newEntry);
      fs.writeFile(filePath, JSON.stringify(allEntries, null, 2), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("File successfully written!");
                console.log(allEntries);
            }
        });
      return allEntries;
    }
    // destroy() {
    //     const entry = data.filter((ent) => ent.id === this.id)[0];
    //     data.splice(data.indexOf(entry), 1);
    // }
}

module.exports = Entry;
