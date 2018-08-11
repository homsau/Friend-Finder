// Pull in required dependencies
var path = require("path");

// Import the list of friend entries
var friends = require("../data/friends.js");

// Export API routes
module.exports = function(app) {
	// all friend friend entries
	app.get("/api/friends", function(req, res) {
    res.json(friends);
    });
    
    app.post("/api/friends", function(req, res) {
		// get the user input
        var userInput = req.body;
        var userResults = userInput.results;
        var totalPointDiff = 100;
        var friendName;
        var friendPhoto;
        
        for (var i = 0; i < friends.length; i++) {
            var pointDiff = 0;
            for (var j = 0; j < userResults.length; j++) {
                pointDiff += Math.abs(friends[i].results[j] - userResults[j]);
            }
            if (pointDiff < totalPointDiff) {
                friendName = friends[i].name;
                friendPhoto = friends[i].photo
                totalPointDiff = pointDiff;
            }
        }
		// Add new user
		friends.push(userInput);

		res.json({/*totalPointDiff: totalPointDiff, */friendName: friendName, friendPhoto: friendPhoto});
	});
};