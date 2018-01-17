var mongoose = require("mongoose");
var Campground = require("./models/campground.js");
var Comment = require("./models/comments.js");

// Starter data when resetting server
var data = [
	{
		name: "Cloud's Rest",
		image: "https://static.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."


	},
	{
		name: "The Beach",
		image: "https://static.pexels.com/photos/248797/pexels-photo-248797.jpeg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."


	},
	{
		name: "Valley View",
		image: "https://www.w3schools.com/w3css/img_fjords.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."


	}	
];



function seedDB(){
	// Remove all campgrounds
	Campground.remove({}, function(err) {
		if (err){
			console.log(err);
		} else {
			console.log("Removed Campgrounds");
		
			// Add a few Campgrounds...AFTER removing
			data.forEach(function(seed){
				Campground.create(seed, function(err, campground){
					if (err){
						console.log(err);
					} else {
						console.log("Added Campground");

						// Adding a Comment
						Comment.create(
							{
								text: "This place is great",
								author: "Homer"
							}, function (err, comment){
								if (err){
									console.log(err);
								} else {
									campground.comments.push(comment._id);
									campground.save();
									console.log("Created comment");
								}
							});
					}
				});
			});
		}
	});


	// Add a few comments
}

// return function without running
module.exports = seedDB;