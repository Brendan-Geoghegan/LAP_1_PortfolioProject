const fs = require("fs");
const filePath = "./data.json"

const saveData = (data) => {
    const stringifyData = JSON.stringify(data, null, 2)
    fs.writeFileSync(filePath, stringifyData)
}
// get list of data this function can be used as get all function
const getEntryData = () => {
    const jsonData = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(jsonData)    
}
// call the data as a global to be used in all functions
const entries = getEntryData()
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
            //   const entries = getEntryData()
              return entries;
          } catch (err) {
              console.log(err);
          }
      
    }

    static findById(id) {
        // const entries = getEntryData()
        const entry = entries.filter(element => element.id == id)
        if(entry.length == 0) {
            return false
        } else {
            return entry;
        }
    }

    static create(entry) {
        // const entries = getEntryData()
        const newEntryId = entries[entries.length - 1].id + 1;
        const newEntry = new Entry({ id: newEntryId, ...entry});
        entries.push(newEntry);
        saveData(entries)
        return entries[entries.length-1];
    }

    static addAcomment(id, text) {
        console.log("add comment function");
        console.log(id,"\n",text)
        const entryToAddComment = entries.filter(eachEle => eachEle.id === id)
        // console.log(entryToAddComment[0]);
        // console.log(entryToAddComment[0].comments);
        entryToAddComment[0].comments.push(text)
        saveData(entries)
        return entryToAddComment[0];
    }

    static updateReactions(entryId, reaction) {
        const entryToUpdate = entries.filter(eachEle => eachEle.id === entryId)[0];
        entryToUpdate.reactions[reaction] += 1;
        saveData(entries);
        return entryToUpdate;
    }

    static updateGif(entryId, gif) {
        const entryToUpdate = entries.filter(eachEle => eachEle.id === entryId)[0];
        entryToUpdate.gif = gif;
        saveData(entries);
        return entryToUpdate;
    }

    static deleteEntry(id) {
        const entriesAfterFilter = entries.filter(entry => entry.id !== id)
        if(entries.length === entriesAfterFilter.length) {
            return false
        }else {
            console.log(entriesAfterFilter);
            saveData(entriesAfterFilter)
            return entriesAfterFilter
        }
        
    }
}

module.exports = Entry
