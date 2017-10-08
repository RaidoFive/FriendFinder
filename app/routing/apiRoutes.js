// Creating the API routes and exporting them for use
// in the main server file.

// create variable linking our friends list from the friends.js file
var friends = require("../data/friends.js");
var selectedFriend = {};
// ----------- Routes ------------ //

module.exports = function(app){
  // GET Request
  // The code below handles when a user visits the
  // API friends list page

  app.get("/api/friends", function(req, res){
    res.json(friends);
  });
  
  // POST Request
  // The code below handles when a user submits the survey
  // form (as a JSON object)

  app.post("/api/friends", function(req, res){

    var newUserName = req.body.name;
    var newUserPic = req.body.photo;
    var newUserScores = req.body.scores.map(function(item){
      return parseInt(item, 10)
    });

    var sum = 0;
    var differences = [];

    for (var i = 0; i < friends.length; i++) {

      for (var j = 0; j < friends[i].scores.length; j++) {

        differences.push(Math.abs(newUserScores[j] - friends[i].scores[j]));

      }//end inner loop

      console.log("\nDiff Array: " + differences);
      //loop through differences array and get the total value; assign to sum variable
      for (var k = 0; k < differences.length; k++) {
        sum += differences[k];
      }

      console.log("Sum of differences: " + sum);
      //assign the diff key with the sum of the values in the differences array
      friends[i].diff = sum;
      console.log("Friend diff key: " + friends[i].diff);

      //reset accumulator and emtpy differences array
      sum = 0;
      differences = [];

    }//end outer loop

    //Use Math.min.apply and the map functions to search through the
    //friends array of objects, and returns the object's minimum diff value
      var min = Math.min.apply(null, friends.map(function(item){
        return item.diff;
      }));

    //find index of the smallest value in the object
    var index = friends.findIndex(x => x.diff===min);

    //return the object at the index equal to the value of the index var assigned above
    res.json(friends[index]);
    console.log("blah", friends[index]);
    return friends[index];
  });
}
