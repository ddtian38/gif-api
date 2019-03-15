//Array of Star Movie Titles
var queryArr = ["Star Wars", "Star Wars Episode V", "Star Wars Episode VI", "Star Wars Episode I", "Star Wars Episode II", "Star Wars Episode III", "Star Wars Episode VII", "Star Wars Episode VIII"]

//Index number for each row of movie
var i = 0;

//For loop goes through the list of movie and pulls data from the OMDB API and displays the movie title, plot poster, and review rating
for(var x = 0; x < queryArr.length; x++){

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


    })
}


