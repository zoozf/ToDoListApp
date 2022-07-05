class ActivitiesView {
    constructor(activities) {
        //App section header
        this.header = document.getElementsByTagName("header")[0];
        this.header.textContent = "To Do List"

        this.userActivities = activities
        this.main = document.getElementsByTagName('main')[0];
        this.main.innerHTML = ''

        this.canvas = document.getElementById("myChart");
        this.canvas.style.display = "none";

        this.container = this.createElement('div');
        this.container.id = "activities-list";
        this.main.append(this.container);

        if(this.userActivities.activitiesList.length == 0){
            this.renderNoActivities();
        } else {
            this.renderActivitiesList();
        }
        this.renderBtn("add-activity-btn","+ add new activity");
    }

    // create a HTML element
    createElement(tag, className) {
        const element = document.createElement(tag);
        if(className){
            element.classList.add(className);
        }
        return element;
    }

    /** creates the page view for no listed activities**/
    renderNoActivities(){
        this.container.innerHTML="";
        let para = document.createElement('p');
        para.textContent = "You don't have any activities scheduled! Well done!";
        this.container.append(para);
    }

    /** creates a btn with a specific id and display text*/
    renderBtn(id,text){
        let addActivityBtn = this.createElement('button');
        addActivityBtn.id = id;
        addActivityBtn.innerHTML = text;
        this.main.append(addActivityBtn);
    }

    /** creates the list view of the activities*/
    renderActivitiesList(){
        let ul = this.createElement('dl');
        ul.setAttribute("id","activities-list");
        for (let i = 0; i<=this.userActivities.activitiesList.length-1; i++){
            let div = this.createElement('div', 'act-list-item')//new
            let li = this.createElement('li')
            if(this.userActivities.activitiesList[i].completed) {
              li.innerHTML = this.userActivities.activitiesList[i].name + "\t✓";
            } else {
              li.innerHTML = this.userActivities.activitiesList[i].name
            }

            li.setAttribute("class","list-item");
            li.setAttribute("value",this.userActivities.activitiesList[i].id);
            let p = this.createElement('p');
            p.innerHTML = this.userActivities.activitiesList[i].description;
            div.appendChild(li); //new
            div.appendChild(p) //new
            ul.appendChild(div) //new
        }
        this.container.append(ul);
    }

    /** creates the page show for adding the new activity*/
    renderNewActivityPage(){
        this.main.innerHTML = "";
        //App section header
        this.header = document.getElementsByTagName("header")[0];
        this.header.textContent = 'Add new activity'

        let container = this.createElement('div');
        container.id = "new-activity";
        this.main.append(container);

        let nameField = this.createElement("h3");
        nameField.innerHTML = "Activity ";
        container.append(nameField);

        let name = this.createElement('input');
        name.id= "new-activity-name";
        name.placeholder = "Enter a new activity";
        container.append(name);

        let description = this.createElement("h3");
        description.innerHTML = "Description ";
        container.append(description);

        let descriptionField = this.createElement('input');
        descriptionField.id= "new-activity-description";
        descriptionField.placeholder = "Enter description/notes";
        container.append(descriptionField);

        this.renderBtn("create-activity-btn","Create new activity");
        this.renderBtn("go-back-btn","Cancel");
    }


    /** creates the page for activity details
     * if the status of activity is pending, i.e. not complete
     * the function displays a done button
     * which has an event listener attached to it to
     * update the activity as complete
     *  otherwise only status completed is displayed
     *  +  a del-btn with a listener attached to it
     *  */
    renderActivityDetailsPage(){
        this.main.innerHTML = "";
        //App section header
        this.header = document.getElementsByTagName("header")[0];
        this.header.textContent = 'Activity Details'

        let container = this.createElement('div');
        container.id = "activity-details";
        this.main.append(container);
        for (let i = 0; i<=this.userActivities.activitiesList.length-1; i++){
           if(event.target.value === this.userActivities.activitiesList[i].id){
               let name = this.createElement("p");
               name.innerHTML = "<b>Activity</b> " + this.userActivities.activitiesList[i].name;
               container.append(name);

               let desc = this.createElement("p");
               desc.innerHTML = "<b>Activity Description</b><br><span class='activity-description'>" + this.userActivities.activitiesList[i].description + "</span>";
               container.append(desc);

               let status = this.createElement("p");
               if (this.userActivities.activitiesList[i].completed === true) {
                   status.innerHTML = "<b>Status</b> <span class='right-text'>Completed</span>";
                   container.append(status);
               } else {
                   status.innerHTML = "<b>Status</b> <span class='right-text'>Pending</span>";
                   container.append(status);
                   this.renderBtn("completed-btn","Complete");

                   this.completedBtnClickListener( () =>{
                       this.userActivities.updateActivity(this.userActivities.activitiesList[i],"completed",true);
                       let currentDay = new Date();
                       this.userActivities.updateActivity(this.userActivities.activitiesList[i],"day",currentDay.getDay());
                       this.main.innerHTML = "";
                       new ActivitiesView(this.userActivities);
                       this.addBtnClickListener( () =>{
                           this.renderNewActivityPage();
                       });
                   });
               }
               this.renderBtn("del-btn","Delete");
               this.delBtnClickListener( () =>{
                   this.userActivities.deleteActivity(this.userActivities.activitiesList[i]);
                   this.main.innerHTML = "";
                   new ActivitiesView(this.userActivities);
                   this.addBtnClickListener( () =>{
                       this.renderNewActivityPage();
                   });
               });
           }
        }
    }

    /** creates a new activity by taking the input
     * and adds it to the list**/
    createActivity(){
        let name = document.getElementById("new-activity-name").value;
        let desc = document.getElementById("new-activity-description").value;
        let activity = new Activity(name,desc);
        this.userActivities.addActivity(activity);
    }

    addBtnClickListener(listener){
        let btn = document.getElementById("add-activity-btn");
        if(btn){
            btn.addEventListener("click",listener);
        }
    }

    completedBtnClickListener(listener){
        let btn = document.getElementById("completed-btn");
        btn.addEventListener("click",listener);
    }

    delBtnClickListener(listener){
        let btn = document.getElementById("del-btn");
        btn.addEventListener("click",listener);
    }
}
