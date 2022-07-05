class ActivitiesController{
    constructor(activities){
        this.view = new ActivitiesView(activities)
        this.view.addBtnClickListener( () =>{
            this.view.renderNewActivityPage();
        });

        window.onclick = e => {
            if(e.target.id ==="go-back-btn"){
                this.view.main.innerHTML = "";
                new ActivitiesView(activities);
                this.view.addBtnClickListener( () =>{
                    this.view.renderNewActivityPage();
                });
            } else if (e.target.id ==="create-activity-btn"){
                this.view.createActivity();
                this.view.main.innerHTML = "";
                new ActivitiesView(activities);
                this.view.addBtnClickListener(() =>{
                    this.view.renderNewActivityPage();
                });
            } else if (e.target.className ==="list-item"){
                this.view.renderActivityDetailsPage();
                this.view.addBtnClickListener( () =>{
                    this.view.renderNewActivityPage();
                });
            }
        }
    }

}
