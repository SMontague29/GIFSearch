//JS for Gif Search here
var topics = [];

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
	$("#add-animal").on("click", function() {

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
