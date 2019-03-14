
var queryURLArr = ["http://www.omdbapi.com/?apikey=trilogy&t=Star%20Wars&plot=short", "http://www.omdbapi.com/?apikey=trilogy&t=Star%20Wars%20Episode%20V&plot=short", "http://www.omdbapi.com/?apikey=trilogy&t=Star%20Wars%20Episode%20VI&plot=short", "http://www.omdbapi.com/?apikey=trilogy&t=Star%20Wars%20Episode%20I&plot=short", "http://www.omdbapi.com/?apikey=trilogy&t=Star%20Wars%20Episode%20II&plot=short", "http://www.omdbapi.com/?apikey=trilogy&t=Star%20Wars%20Episode%20III&plot=short", "http://www.omdbapi.com/?apikey=trilogy&t=Star%20Wars%20Episode%20VII&plot=short", "http://www.omdbapi.com/?apikey=trilogy&t=Star%20Wars%20Episode%20VIII&plot=short"]
var i = 0;

for(var x = 0; x < queryURLArr.length; x++){

    var queryURL = queryURLArr[x];
    console.log(queryURL);

    $.ajax({
        
        url: queryURL,
        method: "GET"

    }).then(function(json){
        i++;
        console.log(x)
        console.log(json);
        console.log($("#movie-"+(i) +" .title"))
        document.querySelector("#movie-"+(i) +" .title").textContent = json.Title;
        document.querySelector("#movie-"+(i) +" .rating").textContent = json.Ratings[1].Value;
        document.querySelector("#movie-"+(i) +" .plot").textContent = json.Plot
        document.querySelector("#movie-"+(i) +" .poster").innerHTML = "<img src=\""+json.Poster+"\">";
        document.querySelector("#movie-"+(i) +" .rated").textContent = json.Rated;



        // $("#movie-"+(i) +" .title").text(json.Title);
        // $("#movie-"+(i) +" .plot").text(json.Ratings[1].Value);
        // $("#movie-"+(i) +" .plot").text(json.Plot).css("width", "10%");
        // $("#movie-"+(i) +" .poster").append($("<img>").attr("src", json.Poster));
        // $("#movie-"+(i) +" .rated").text(json.Rated);



    })
}


