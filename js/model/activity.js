class Activity{
    constructor(name, description) {
        this.id = Math.floor((Math.random() * 10000) + 1);
        this.name = name;
        this.description = description;
        this.completed = false;
        this.dayCompleted = null;
    }
}