  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCtAdZ5CAklgYAWkaCqoMo2gW6x82cdHOs",
    authDomain: "trainschedule-871e6.firebaseapp.com",
    databaseURL: "https://trainschedule-871e6.firebaseio.com",
    projectId: "trainschedule-871e6",
    storageBucket: "trainschedule-871e6.appspot.com",
    messagingSenderId: "400112511812"
  };
  firebase.initializeApp(config);


var database = firebase.database();

//Major Task 1 Create button for adding trains 
$("#addTrainButton").on("click", function (event) {
            event.preventDefault();
            // Grab user input 
            var trainName = $("#trainNameInput").val();
            var trainDestination = $("#destinationNameInput").val();
            var trainFirst = $("#firstTrainInput").val();
            var trainFrequency = $("#frequencyNameInput").val();
            // var trainMinutesTillNext = 0;
            //create local "temp" object for new train
            var firstTimeConverted = moment(trainFirst, "HH:mm").subtract(1, "years");
            console.log(firstTimeConverted);

            // Current Time
            var currentTime = moment();
            console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

            // Difference between the times
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);

            // Time apart (remainder)
            var tRemainder = diffTime % trainFrequency;
            console.log(tRemainder);

            // Minute Until Train
            var tMinutesTillTrain = trainFrequency - tRemainder;
            console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

            // Next Train
            var nextTrain = moment().add(tMinutesTillTrain, "minutes");
            console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

            var newTrain = {
                name: trainName,
                destination: trainDestination,
                firstTrain: trainFirst,
                frequency: trainFrequency,
                minutes: tMinutesTillTrain,
            };
            
      //upload new train to database
      database.ref().push(newTrain);

      $("#trainNameInput").val("");
      $("#destinationNameInput").val("");
      $("#firstTrainInput").val("");
      $("#frequencyNameInput").val();

});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().firstTrain;
    var trainFrequency = childSnapshot.val().frequency;
    var nextTrain = childSnapshot.val().minutes;
    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFirst),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrain),
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});

      //log everything into console
      
