class ActivitiesView {
    constructor(activities) {
        //App section header
        this.header = document.getElementsByTagName("header")[0];
        this.header.textContent = '----- Activities -----'

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
        this.renderBtn("add-activity-btn","Add a new activity");
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
        addActivityBtn.style.height = '5rem';
        addActivityBtn.style.width = '5rem';
        this.main.append(addActivityBtn);
    }

    /** creates the list view of the activities*/
    renderActivitiesList(){
        let ul = this.createElement('dl');
        ul.setAttribute("id","activities-list");
        for (let i = 0; i<=this.userActivities.activitiesList.length-1; i++){
            let div = this.createElement('div', 'act-list-item')//new
            let li = this.createElement('li')
            li.innerHTML = this.userActivities.activitiesList[i].name;
            li.setAttribute("class","list-item");
            li.setAttribute("value",this.userActivities.activitiesList[i].id);
            let p = this.createElement('p');
            p.innerHTML = "--- "+this.userActivities.activitiesList[i].description;
            div.appendChild(li); //new
            div.appendChild(p) //new
            ul.appendChild(div) //new
        }
        this.container.append(ul);
    }

    /** creates the page show for adding the new activity*/
    renderNewActivityPage(){
        this.main.innerHTML = "";
        this.renderBtn("go-back-btn","< Go back");
        //App section header
        this.header = document.getElementsByTagName("header")[0];
        this.header.textContent = '----- Create new activity -----'

        let container = this.createElement('div');
        container.id = "new-activity";
        this.main.append(container);

        let nameField = this.createElement("p");
        nameField.innerHTML = "Activity ";
        container.append(nameField);

        let name = this.createElement('input');
        name.id= "new-activity-name";
        name.placeholder = "Enter a new activity";
        nameField.append(name);

        let description = this.createElement("p");
        description.innerHTML = "Description ";
        container.append(description);

        let descriptionField = this.createElement('input');
        descriptionField.id= "new-activity-description";
        descriptionField.placeholder = "Enter description/notes";
        description.append(descriptionField);

        this.renderBtn("create-activity-btn","Create new activity");
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
        this.renderBtn("go-back-btn","< Go back");
        //App section header
        this.header = document.getElementsByTagName("header")[0];
        this.header.textContent = '----- Activity Details -----'

        let container = this.createElement('div');
        container.id = "activity-details";
        this.main.append(container);
        for (let i = 0; i<=this.userActivities.activitiesList.length-1; i++){
           if(event.target.value === this.userActivities.activitiesList[i].id){
               let name = this.createElement("p");
               name.innerHTML = "<b>Name</b> " + this.userActivities.activitiesList[i].name;
               container.append(name);

               let desc = this.createElement("p");
               desc.innerHTML = "<b>Description</b><br> " + this.userActivities.activitiesList[i].description;
               container.append(desc);

               let status = this.createElement("p");
               if (this.userActivities.activitiesList[i].completed === true) {
                   status.innerHTML = "<b>Status</b> completed";
                   container.append(status);
               } else {
                   status.innerHTML = "<b>Status</b> pending";
                   container.append(status);
                   this.renderBtn("completed-btn","Done!");

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
               this.renderBtn("del-btn","Delete activity");
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