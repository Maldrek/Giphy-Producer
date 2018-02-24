$(document).ready(function(){


// Creates an array of subjects that will already be populated in the div
var subjects = ["Animals", "Cars", "Musicals", "Technology", "Humor", "Business", "Chemistry"];


// This function is called to create new buttons based on user input
function renderButtons() {

    $("#array-buttons").empty();

    for (var i = 0; i < subjects.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-info subject-button");
        a.attr("data-name", subjects[i]);
        a.text(subjects[i]);
        $("#array-buttons").append(a);
    }
}

$("#add-subject").on("click", function (event) {
    event.preventDefault();
    var subject = $("#subject-input").val().trim();
    subjects.push(subject);
    renderButtons();
    $('#subject-input').val("");
});

renderButtons();

// This function will create more subject options based on user input
function displaySubjects(subject) {

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        subject + "&api_key=p4JC5MhsGo6uW3ZNMEjBKFnZc2bnjMV7&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#populate-gifs").empty();
        var results = response;

        for (var i = 0; i < results.data.length; i++) {
            var giphy = results.data[i].images.fixed_height_still.url;
            var gifDiv = document.createElement("DIV");
            var newGif = document.createElement("IMG");
            var rating = "Rating: " + results.data[i].rating;
            newGif.setAttribute("src", giphy);
            var ratingDiv = document.createElement("P");
            ratingDiv.textContent = rating;
            gifDiv.classList.add("float");
            newGif.classList.add("start-stop");
            gifDiv.append(newGif);
            $("#populate-gifs").append(gifDiv);
            newGif.after(ratingDiv);
        };
    });

}

$(document).on("click", ".subject-button", function(){
    var subject = $(this).attr("data-name");
    displaySubjects(subject);
});

// Start and stop the gif playing
$(document).on('click', '.start-stop', function () {
    var src = $(this).attr("src");
    if ($(this).hasClass('playing')) {
        //stop
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
        $(this).removeClass('playing');
    } else {
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
    }
});

});