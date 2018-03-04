// div id variables for later

var header = $("header");
var schedule = $("#schedule");
var inputArea = $("#inputArea");
var footer = $("footer");
var trainName = $("#trainName");
var trainDes = $("#trainDestination");
var trainDep = $("#trainDeparture");
var trainFreq = $("#trainFrequency");
// Create the userName variable for later
var userName = "Probably Gavin, he always forgets to enter his username";

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


// // initial function 
// function initializePage(){
// // hide the divs on the page
// header.hide();
// schedule.hide();
// inputArea.hide();
// footer.hide();
// // show the modal
// $("#loginModal").modal("show");
// }

// function for the page
$(document).ready(function () {
	// wind it up
// initializePage();
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
	$("#submitBtnForm").click(function(event){
		// prevent default w/ firefox compatibility
		event.preventDefault(event);

	})

});