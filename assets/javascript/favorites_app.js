var cookieIndex = 1;

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

while(readCookie("gif"+cookieIndex) !== null ){
    var fav = readCookie("gif"+cookieIndex)
    console.log(fav)
    // fav.replace("\"", "'");
    $(".container .row .col-md-12").append(fav);
    cookieIndex++;
}

$(document).on("click", "img", function(){
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