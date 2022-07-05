class Activities {

    constructor(){
        this.activitiesList = [];
        this.loadActivities();
        this.completed = {'Monday':0, 'Tuesday':0,'Wednesday':0, 'Thursday':0, 'Friday':0, 'Saturday':0,'Sunday':0};
    }

    addActivity(activity) {
        this.activitiesList.push(activity);
        localStorage.setItem("user", "list");
        console.log(this.activitiesList)
    }

    deleteActivity(activity) {
        for (let i=0; i<this.activitiesList.length; i++){
            if(activity.id === this.activitiesList[i].id){
                this.activitiesList.splice(i,1);
            }
        }
    }

    loadActivities(){
      localStorage.getItem("user")
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
                } else if (field === "day"){
                    let weekday = ["Monday","Tuesday","Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                    this.activitiesList[i].dayCompleted = weekday[newValue];
                    this.completed[weekday[newValue]] +=1;
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

