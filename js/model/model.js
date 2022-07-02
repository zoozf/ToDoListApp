class Model{
    constructor() {
        this.journal = new Journal();
        this.activities = new Activities();
    }

    getJournal() {
        return this.journal
    }

    getActivities(){
        return this.activities
    }

}