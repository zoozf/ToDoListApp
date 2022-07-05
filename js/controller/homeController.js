class HomeController{
    constructor(activities){
        new HomeView(activities)

        window.ontouchend = e => {
            if (e.target.className ==="list-item"){
               let activitiesView = new ActivitiesView(activities);
               activitiesView.renderActivityDetailsPage();
            }
        }
    }
}
