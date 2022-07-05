class Activities {

    constructor(){
        this.activitiesList = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : []
        this.completed = localStorage.getItem("user-completed") ? JSON.parse(localStorage.getItem("user-completed")) : {'Monday':0, 'Tuesday':0,'Wednesday':0, 'Thursday':0, 'Friday':0, 'Saturday':0,'Sunday':0};
    }

    addActivity(activity) {
        this.activitiesList.push(activity);
        localStorage.setItem("user", JSON.stringify(this.activitiesList));
    }

    deleteActivity(activity) {
        for (let i=0; i<this.activitiesList.length; i++){
            if(activity.id === this.activitiesList[i].id){
                this.activitiesList.splice(i,1);
            }
        }
    }


    updateActivity(activity,field,newValue) {
        for (let i=0; i<this.activitiesList.length; i++){
            if(activity.id === this.activitiesList[i].id){
                if(field == "id") {
                    this.activitiesList[i].id = newValue;
                } else if (field == "name"){
                    this.activitiesList[i].name = newValue;
                } else if (field == "description"){
                    this.activitiesList[i].description = newValue;
                }else if(field == "completed"){
                    this.activitiesList[i].completed = newValue;
                    localStorage.setItem("user", JSON.stringify(this.activitiesList));
                } else if (field === "day"){
                    let weekday = ["Monday","Tuesday","Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                    this.activitiesList[i].dayCompleted = weekday[newValue];
                    this.completed[weekday[newValue]] +=1;
                    localStorage.setItem("user-completed", JSON.stringify(this.completed))
                } else {
                    return;
                }
            }
        }
    }

    getStats(){
        let stats = [];
        for(let key in this.completed) {
            stats.push(this.completed[key]);
        }
        return stats;
    }
}

