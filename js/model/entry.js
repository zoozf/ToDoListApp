class Entry{
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description =  description;
        let d = new Date();
        this.date = d.toUTCString();
    }
}