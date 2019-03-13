var topics = ["Darth Vader", "Anakin Skywalker", "Clones Troopers", "Ahsoka Tano", "Commander Cody", "Count Dooku", "Rey", "Finn", "Han Solo", "Padme", "Princess Leia"];

var buttonHolder = document.querySelector("#button-holder");

function renderTopicButtons(topicsArr){
    if( document.getElementsByClassName("gif-buttons") !== undefined){
        while( buttonHolder.firstChild){
            buttonHolder.removeChild( buttonHolder.firstChild);
        }
    }
  
    for (ele in topicsArr){
        var button = document.createElement("button");
        button.setAttribute("class", "btn btn-dark gif-buttons")
        var buttonText = document.createTextNode(topicsArr[ele]);
        button.appendChild(buttonText);
        button.setAttribute("data-value", topicsArr[ele] )
        buttonHolder.appendChild(button);
    }
}

function main(){
    renderTopicButtons(topics);


    for(var i = 0; i < document.getElementsByClassName("gif-buttons").length; i++){
            document.getElementsByClassName("gif-buttons")[i].addEventListener("click", function(event){
                console.log(this);
                var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + this["data-value"]+"&api_key=V22nkgDPxO4XIXsnIbDLtfUQkb2ePGCl&limit=10";
                console.log(queryURL);
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response){
                    console.log(response);
                    for(var i = 0; i < response.data.length; i++){
                        var image = document.createElement("img");
                        image.setAttribute("src", response.data[i].source);
                        document.getElementById("gifs-holder").appendChild()
                    }
                    

                });
            });
    
    
        }
            
        document.getElementById("submit").addEventListener("click",function(event){
            event.preventDefault();
            var gifText = document.getElementById("gif-search").search.value;
            topics.push(gifText);
            renderTopicButtons(topics);
    
        })
}




main();
