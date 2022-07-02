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
            return "Good morning! ☕ ";

        } else if (hour >= 12 && hour < 17) {
            return "Good afternoon! 🌇 ";

        } else if (hour >= 17 && hour < 24) {
            return "Good evening! 🌃";
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

                let authorPara = document.createElement("h5");
                if(quote.author) {
                    authorPara.innerHTML  ="Author: " + quote.author;
                } else {
                    authorPara.innerHTML  ="Author: unknown";
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
        let nextText = this.createElement("p");
        nextText.innerHTML = "Next activity: ";

        nextDiv.appendChild(nextText);
        this.main.appendChild(nextDiv);
        let para = this.createElement("p");
        //Retrieve the first non-completed activity in the list.
        let nextActvity = undefined
        for(let i = 0; i < this.userActivities.activitiesList.length; i++){
            if(this.userActivities.activitiesList[i].completed === false){
                nextActvity = this.userActivities.activitiesList[i]
                break
            }
        }
        if(nextActvity === undefined){
            para.innerHTML = "Rest 🏖️";
            nextDiv.appendChild(para);
        } else {
            let ul = this.createElement('dl');
            ul.setAttribute("id","activities-list");
            let div = this.createElement('div', 'act-list-item')//new
            let li = this.createElement('li')
            li.innerHTML = nextActvity.name;
            li.setAttribute("class","list-item");
            li.setAttribute("value",nextActvity.id);
            let p = this.createElement('p');
            p.innerHTML = "--- "+nextActvity.description;
            div.appendChild(li); //new
            div.appendChild(p) //new
            ul.appendChild(div) //
            nextDiv.appendChild(ul)
        }
    }

    renderStats() {
        let chart = document.getElementById("myChart");
        let weekdays = ['Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];

        let stats = model.activities.getStats();
        let myChart = new Chart(chart, {
            type: 'bar',
            data: {
                labels: weekdays,
                datasets: [
                    {
                        label: "Weekly activities completed",
                        data: stats,
                        backgroundColor: [
                            "rgba(11, 132, 165,0.7)",
                            "rgba(246, 200, 95,0.7)",
                            "rgba(111, 78, 124,0.7)",
                            "rgba(157, 216, 102,0.7)",
                            "rgba(202, 71, 47,0.7)",
                            "rgba(255, 160, 86,0.7)",
                            "rgba(141, 221, 208,0.5)",
                        ]
                    }
                ]
            },
        });
    }
}
