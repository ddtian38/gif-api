//Array of topics
var topics = ["Darth Vader", "Anakin Skywalker", "Clones Troopers", "Ahsoka Tano", "Commander Cody", "Count Dooku", "Rey", "Finn", "Han Solo", "Padme", "Princess Leia"];

//variable holds the buttonHolder container variable
var buttonHolder = document.querySelector("#button-holder");

//cookieIndex to keep track of cookie ID after user selects favorites
var cookieIndex = 1;

//function creates cookies
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

//Function creates buttons from array topic
function renderTopicButtons(topicsArr){
    //Checks to see if there is any existing gif buttons. If there is after a user enters a new topic, existing GUF buttons will be removed and created, with new button at the end.
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

    //Assigns an event listener click for each of the GIF buttons
    var gifButtonsArr = document.getElementsByClassName("gif-buttons")
    for(var i = 0; i < gifButtonsArr.length; i++){

        //After a button is clicked, GIF data from the GIF API comes through queryURL.
        gifButtonsArr[i].addEventListener("click", function(event){

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + this.getAttribute("data-value") +"&api_key=V22nkgDPxO4XIXsnIbDLtfUQkb2ePGCl&limit=10";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){

                //Array of 10 GIFs from the GIF API promise object
                var gifArr = response.data;

                //For loop assigns the data from the GIFs to 10 containers: title, rating, still gif, and moving gif
                for(var i = 0; i < gifArr.length; i++){
                    var gif = document.createElement("div");
                    gif.setAttribute("class","gif-container float-lg-left");

                    var gifRating = document.createElement("p");
                    gifRating.setAttribute("id", "title");
                    var title = gifArr[i].title;
                    gifRating.textContent = title.toUpperCase().slice(0, title.indexOf("GIF"));
                    gif.append(gifRating);

                    var gifRating = document.createElement("p");
                    gifRating.setAttribute("id", "rating");
                    gifRating.textContent = "Rating: " + gifArr[i].rating.toUpperCase();
                    gif.append(gifRating);

                    var imageGif = document.createElement("img");
                    imageGif.setAttribute("data-state","still");
                    imageGif.setAttribute("data-animate", gifArr[i].images["original"].url)
                    imageGif.setAttribute("data-still", gifArr[i].images["original_still"].url)
                    imageGif.setAttribute("data-title", title.toUpperCase().slice(0, title.indexOf("GIF")))
                    imageGif.setAttribute("src", gifArr[i].images["original_still"].url);
                    imageGif.setAttribute("alt", "gif"+(i+1));
                    gif.append(imageGif);

                    //Favorite and Download button is created for each GIF
                    var favoriteButton = document.createElement("button")
                    favoriteButton.setAttribute("class", "btn btn-dark gif-buttons")
                    favoriteButton.textContent = "Favorite"
                    favoriteButton.setAttribute("id", "favorite-button")
                    gif.appendChild(favoriteButton);

                    var downloadButton = document.createElement("button")
                    downloadButton.setAttribute("class", "btn btn-dark gif-buttons")
                    var downloadLink = document.createElement("a");
                    downloadLink.textContent = "Download"
                    downloadLink.setAttribute("href", gifArr[i].images["original"].url)
                    downloadLink.setAttribute("download", "download")
                    downloadButton.appendChild(downloadLink);
                    downloadButton.setAttribute("id", "download-button")
                    gif.appendChild(downloadButton);

                    //Prpends the GIF in the gifs-holder container
                    document.getElementById("gifs-holder").prepend(gif);

                }

            });
        });


    }
}

//Function runs main program
function main(){
    renderTopicButtons(topics);

        document.getElementById("submit").addEventListener("click",function(event){
            event.preventDefault();
            var gifText = document.getElementById("gif-search").search.value;
            if(topics.indexOf(gifText) === -1){
                topics.push(gifText);
            }
            renderTopicButtons(topics);
    
        })
}


//Document listens for event listener for any GIF that is clicked. GIF will switch between still and animated.
$(document).on("click", ".gif-container img", function(){
    console.log($(this).attr("data-animate"));
    var state = $(this).attr("data-state")
    if(state === "still"){
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));

    }else if(state === "animate"){
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }
})



//Document listens for event listener for any favorite button. When a user clicks on the favorite button, data of the GIF will be stored in a cookie, which will be accessed by the favorite_app.js. favorite.html will pull cookie data and display the user's favorite GIFs
$(document).on("click", "#favorite-button", function(){

    var favGif = $(this)[0].parentNode.cloneNode(true)
    favGif.removeChild(favGif.childNodes[3]);
    createCookie("gif"+cookieIndex, favGif.outerHTML, 20);
    cookieIndex++;
})

//Running main program
main();
