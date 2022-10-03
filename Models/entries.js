const fs = require("fs");
const filePath = "./data.json"

const saveData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(filePath, stringifyData)
}
// get list of data this function can be used as get all function
const getEntryData = () => {
    const jsonData = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(jsonData)    
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
        try {
              const entries = getEntryData()
            //   console.log(entries);
              return entries;
          } catch (err) {
              console.log(err);
          }
      
    }

    static findById(id) {
    if(Entry.all[id]) {
        return Entry.all[id];
    } else {
        return false
    }
    }

    static create(entry) {
        const entries = getEntryData()
        const newEntryId = entries[entries.length - 1].id + 1;
        const newEntry = new Entry({ id: newEntryId, ...entry});
        console.log(1, newEntry);
        entries.push(newEntry);
        saveData(entries)
        return entries;
    }
    
    // destroy() {
    //     const entry = data.filter((ent) => ent.id === this.id)[0];
    //     data.splice(data.indexOf(entry), 1);
    // }
}

module.exports = Entry;
