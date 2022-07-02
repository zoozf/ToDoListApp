class Journal{
    constructor() {
        this.entry_list = [];
        
    }

    addEntry(title, description){
        let id = 0
        if (this.entry_list.length > 0){
            id = this.entry_list.length + 1
        }else{
            id = 1
        }
        this.entry_list.push(new Entry(id, title, description))
        this.listHasChanged(this.entry_list)
    }

    deleteEntry(id){
        this.entry_list = this.entry_list.filter((entry) => entry.id !== id)
        this.listHasChanged(this.entry_list)
    }
    
    updateEntry(id, title, description){
        this.entry_list.forEach(entry => {
            if (parseInt(entry.id) === parseInt(id)){
                entry.title = title
                entry.description = description
            }
        })
        this.listHasChanged(this.entry_list)
    }

    bindEntryListChanged(handler){
        this.listHasChanged = handler
    }
}