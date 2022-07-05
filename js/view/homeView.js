class HomeView {
    /**
     * Quotes are displayed thanks to SergeyWebPro at freeCodeCamp and the article
     * Free API - Inspirational quotes JSON with code examples which can be found at:
     * href="https://forum.freecodecamp.org/t/free-api-inspirational-quotes-json-with-code-examples/311373"
     **/

    constructor(activities) {
        this.userActivities = activities;
        this.header = document.getElementsByTagName("header")[0];
        this.header.textContent = this.renderGreeting();

        this.main = document.getElementsByTagName('main')[0];
        this.main.textContent = '';

        this.container = this.createElement('div');
        this.container.id = "quote";
        this.container.textContent = '';

        this.quoteheader = this.createElement('h3');
        this.quoteheader.textContent = "Motivational Quote";
        this.container.append(this.quoteheader);

        this.main.append(this.container);

        this.renderQuote();


        this.renderNextActivity();

        this.canvas = document.getElementById("myChart");
        this.canvas.style.display = "block";
        this.renderStats();
    }

    // create a HTML element
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) {
            element.classList.add(className);
        }
        return element;
    }

    renderGreeting() {
        let currentDate = new Date();
        let hour = currentDate.getHours();

        if (hour >= 0 && hour < 12) {
            return "Good Morning!  🌣";

        } else if (hour >= 12 && hour < 17) {
            return "Good Afternoon!  ☁ ";

        } else if (hour >= 17 && hour < 24) {
            return "Good Evening!  🌙";
        }
    }


    renderQuote() {
        let request = new XMLHttpRequest();
        request.open('GET', 'https://type.fit/api/quotes', true);

        let quote;
        request.onload = function () {
            let container = document.getElementById("quote");
            let data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {

                quote = data[Math.floor(Math.random() * data.length)];

                let quotePara = document.createElement("p");
                quotePara.innerHTML = "\"" + quote.text + "\"";
                quotePara.style.fontStyle = "italic";
                container.appendChild(quotePara);

                let authorPara = document.createElement("p");
                if(quote.author) {
                    authorPara.innerHTML  ="— " + quote.author;
                } else {
                    authorPara.innerHTML  ="— unknown";
                }
                container.appendChild(authorPara)
            } else {
                console.log('error');
            }
        }
        request.send();
    }

    renderNextActivity(){
        let nextDiv = this.createElement("div");
        nextDiv.setAttribute("class", "next-activity-div")
        let nextText = this.createElement("h3");
        nextText.innerHTML = "Next activity";

        nextDiv.appendChild(nextText);
        this.main.appendChild(nextDiv);
        let para = this.createElement("p");
        //Retrieve the first non-completed activity in the list.
        let nextActivity = undefined
        for(let i = 0; i < this.userActivities.activitiesList.length; i++){
            if(this.userActivities.activitiesList[i].completed === false){
                nextActivity = this.userActivities.activitiesList[i]
                break
            }
        }
        if(nextActivity === undefined){
            para.innerHTML = "⛱ Rest. You have completed all your tasks!";
            nextDiv.appendChild(para);
        } else {
            let ul = this.createElement('dl');
            ul.setAttribute("id","activities-list");
            let div = this.createElement('div', 'act-list-item');
            let li = this.createElement('li');
            li.innerHTML = nextActivity.name;
            li.setAttribute("class","list-item");
            li.setAttribute("value",nextActivity.id);
            let p = this.createElement('p');
            p.innerHTML =nextActivity.description;
            div.appendChild(li);
            div.appendChild(p);
            ul.appendChild(div);
            nextDiv.appendChild(ul);
        }
    }

    renderStats() {
        let chart = document.getElementById("myChart");
        let weekdays = ['MON', 'TUE','WED', 'THU', 'FRI', 'SAT','SUN'];

        let stats = model.activities.getStats();
        let myChart = new Chart(chart, {
            type: 'bar',
            data: {
              labels: weekdays,
              datasets: [{
                label: 'Weekly Performance',
                data: stats,
                fill: false,
                borderColor: '#009988',
                backgroundColor: '#009988',
                tension: 0.1
              }]
            },
          options: {
            maintainAspectRatio: true,
            aspectRatio: 2,
            legend: {
              display: true,
              position:'top',
              align:'start',
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  display: false
                }
              }]
            }
          }
        });
    }
}
