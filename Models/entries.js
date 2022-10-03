const data =  require("../database/data");

class Entry {
    constructor(data) {
        this.id = data.id;
        this.entry = data.entry;
        this.comments = data.comments;
        this.reactions = data.reactions;
        this.gif = data.gif;
    }
    
}

module.exports = Entry;
