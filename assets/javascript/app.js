var topics = ["Darth Vader", "Anakin Skywalker", "Clones Troopers", "Ahsoka Tano", "Commander Cody", "Count Dooku", "Rey", "Finn", "Han Solo", "Padme", "Princess Leia"];

var buttonHolder = document.querySelector("#button-holder");

localStorage.clear();
var favorites = [];
 var cookieIndex = 1;
// if(document.cookie === ""){
//     var favorites = [];
// }
// else{
//     var favorites = ;
// }


function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}



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

    var gifButtonsArr = document.getElementsByClassName("gif-buttons")
    for(var i = 0; i < gifButtonsArr.length; i++){

        gifButtonsArr[i].addEventListener("click", function(event){

            console.log(this.getAttribute("data-value"));
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + this.getAttribute("data-value") +"&api_key=V22nkgDPxO4XIXsnIbDLtfUQkb2ePGCl&limit=10";
            console.log(queryURL);
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
                console.log(response);

                var gifArr = response.data;

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


                    document.getElementById("gifs-holder").prepend(gif);

                }

            });
        });


    }
}

function main(){
    renderTopicButtons(topics);

        document.getElementById("submit").addEventListener("click",function(event){
            event.preventDefault();
            var gifText = document.getElementById("gif-search").search.value;
            topics.push(gifText);
            renderTopicButtons(topics);
    
        })
}


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




$(document).on("click", "#favorite-button", function(){
    x = $(this);
    console.log($(this));
    var favGif = $(this)[0].parentNode.cloneNode(true)
    favGif.removeChild(favGif.childNodes[4]);
    favGif.removeChild(favGif.childNodes[3]);

    console.log(favGif)
    favorites.push(favGif.outerHTML);
    createCookie("gif"+cookieIndex, favGif.outerHTML, 20);
    cookieIndex++;
})


main();
