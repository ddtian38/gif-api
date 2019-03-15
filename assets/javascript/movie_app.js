
var queryURLArr = ["Star Wars", "Star Wars Episode V", "Star Wars% Episode VI", "Star Wars Episode I", "Star Wars Episode II", "Star Wars Episode III", "Star Wars Episode VII", "Star Wars Episode VIII"]

var i = 0;

for(var x = 0; x < queryURLArr.length; x++){

    var queryURL = "https://www.omdbapi.com/?apikey=trilogy&t="+queryArr[x]+"&plot=short";
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


