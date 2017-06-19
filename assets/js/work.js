//JS for Gif Search here
var topics = ["F-14", "Super Hornet", "Blue Angels", "F-35"];

// Event listeners
function addTopicClickEventListener() {
	$(".topic").on("click", function() {

		var topic = $(this).attr("data-name");

		retrievegifs(topic);
	});
};

function addgifClickEventListener() {
	$(".gif").on("click", function() {

	  var state = $(this).attr("data-state");

	  if (state === "still") {
	    $(this).attr("src", $(this).attr("data-animate"));
	    $(this).attr("data-state", "animate");
	  } else {
	    $(this).attr("src", $(this).attr("data-still"));
	    $(this).attr("data-state", "still");
	  }
	});
};

function addNewTopicClickEventListener() {
	$("#add-search").on("click", function() {

	  event.preventDefault();

	  var newTopic = $("#topic-input").val().trim();

	  var alreadyTopicCheck = jQuery.inArray(newTopic, topics);

	  if (newTopic === "") {
	  	return;
	  } else if (alreadyTopicCheck !== -1){
	  	$("#topic-input").val("");
	  	return;
	  } else {

	  	checkTopicExists(newTopic);

	  }

	});
};

// Functions

function renderButtons;

function checkTopicExists(newTopic) {
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newTopic  + "&limit=10&api_key=dc6zaTOxFJmzC";

	$.ajax({
	url: queryURL,
	method: "GET"
	}).done(function(response) {

	  console.log(response);

	  if (response.data.length === 0) {

	  	alert("No gifs found for that search!");

	  	$("#topic-input").val("");

	  	return;

	  } else {

	  	retrievegifs(newTopic);

	  	topics.push(newTopic);

	  	renderButtons();

	  	$("#topic-input").val("");
	  }

	});

};

function renderButtons() {

	$(".buttons-container").empty();

	for (var i = 0; i < topics.length; i++) {

	  var a = $("<button>");

	  a.addClass("topic btn btn-default navbar-btn");

	  a.attr("data-name", topics[i]);

	  a.text(topics[i]);

	  $(".buttons-container").append(a);
	}

	addTopicClickEventListener();
};

function retrievegifs(topic) {

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic  + "&api_key=dc6zaTOxFJmzC";

	$.ajax({
	url: queryURL,
	method: "GET"
	}).done(function(response) {

	  console.log(response);

	  displaygifs(response);

	});
};

function displaygifs(response) {

	$("#display-gifs").empty();

	for (var i = 0; i < response.data.length; i++) {

		var gifDiv = $("<div class='gif pull-left'>");

		var rating = response.data[i].rating;

		var ratingInfo = $("<div class='rating'>").text("Rating: " + rating);

		gifDiv.append(ratingInfo);

		var originalgif = response.data[i].images.original.url;

		var stillgif = response.data[i].images.original_still.url;

		var gifImage = $("<img>").attr("src", stillgif);

		gifImage.addClass("gif");

		gifImage.attr("data-still", stillgif);

		gifImage.attr("data-animate", originalgif);

		gifImage.attr("data-state", "still");

		gifDiv.append(gifImage);

		$("#display-gifs").append(gifDiv);

	}
	addgifClickEventListener();
};

$(document).ready(function() {

	addNewTopicClickEventListener();
});
