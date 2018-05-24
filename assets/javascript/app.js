// div id variables for later

var header = $("header");
var schedule = $("#schedule");
var inputArea = $("#inputArea");
var footer = $("footer");
var trainName = $("#trainName");
var trainDes = $("#trainDestination");
var trainDep = $("#trainDeparture");
var trainFreq = $("#trainFrequency");
var trainDisp = $("#trainDisplay");

//  firebase info
var config = {
	apiKey: "AIzaSyDxe6ILAFwB7T4vLpS5JPj9-wDpu2OiQtM",
	authDomain: "hw7-trains-91c4c.firebaseapp.com",
	databaseURL: "https://hw7-trains-91c4c.firebaseio.com",
	projectId: "hw7-trains-91c4c",
	storageBucket: "hw7-trains-91c4c.appspot.com",
	messagingSenderId: "1080446589226"
};
firebase.initializeApp(config);

var database = firebase.database();


// function for the page
$(document).ready(function () {
	// wind it up
	// On click of the submit button on the Modal
	$("#submitBtnModal").click(function () {
		event.preventDefault();
		// update userName to the input from the user
		userName = $("#userName").val()
		console.log(userName);
	})
	// when the Modal is dismissed
	$('#loginModal').on('hidden.bs.modal', function () {
		// show the elements on the page
		header.show();
		schedule.show();
		inputArea.show();
		footer.show();
	});
	// when the submit button in the form section is clicked
	$("#submitBtnForm").click(function (event) {
		// prevent default w/ firefox compatibility
		event.preventDefault(event);
		// get some values
		var name = trainName.val().trim();
		var des = trainDes.val().trim();
		var dep = trainDep.val().trim();
		var freq = trainFreq.val().trim();
		// make a temp object to later push to the database
		var tempObject = {
			name: name,
			description: des,
			departure: dep,
			frequency: freq
		};
		// push the tempObject at the reference point of the root
		database.ref().push(tempObject);
		// reset the inputs
		$("#inputForm")[0].reset();
	});
	// add event listener of value to the database
	database.ref().on("value", function (snapshot) {
		// for each item at the data reference of root
		trainDisp.empty();
		var snapObject = snapshot.val();
		// do a for loop
		var i = 0;
		for (var prop in snapObject) {
			// make a new row
			var childSnapshot = snapObject[prop]
			var finishedObj = $("<tr>");

			// make a variable that captures the information from the object in Firebase in Moment format
			var firstTrain = moment(childSnapshot.departure, "HH:mm");
			// console.log("firstTrain", firstTrain )
			// // subtract the times to get a number
			var timePassed = moment().diff(firstTrain, "minutes");
			// console.log("timePassed", timePassed);
			// // get the remainder of the timepassed divided by frequency to get our last variable
			var timeToNextTrain = timePassed % childSnapshot.frequency;
// add the timetoNextTrain variable to the current time to get next arrival
			var trainCalc = moment().add(timeToNextTrain, "minutes").format("HH:mm");

			// make some variables 
			var changeMe = $("<td>");
			var childName = $("<td>").text(childSnapshot.name);
			var childDes = $("<td>").text(childSnapshot.description);
			var childFreq = $("<td>").text(childSnapshot.frequency);
			var nextTrain = $("<td>").text(trainCalc);
			var nextTrainMin = $("<td>").text(timeToNextTrain);
			// building our edit button
			changeMe.addClass("editRow")
			.html('<span class = "glyphicon glyphicon-pencil"></span>')
			.attr("data-row", ("row_number" +i));
			// build our row and append to the finishedObj
			finishedObj.append(changeMe, childName, childDes, childFreq, nextTrain, nextTrainMin);
			trainDisp.append(finishedObj);
			// add to i so we can reference the 
			i++;
		}

	});

});