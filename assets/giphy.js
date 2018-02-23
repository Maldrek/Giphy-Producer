// Creates an array of subjects that will already be populated in the div
var subjects = ["animals", "cars", "musicals", "technology", "humor", "business", "chemistry"];

function renderButtons() {

    $("#array-buttons").empty();

    for (var i = 0; i < subjects.length; i++) {
        var a = $("<button>");
        a.addClass("btn-info subject-button");
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
});

// This function will create more subject options based on user input
function displaySubjects() {

    var subject = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        subject + "&api_key=dc6zaTOxFJmzC&" + limitOption;

    $ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

        }
    })

}