var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

/*
Set up Schema
*/
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*
Databases
*/

// Campground.create({
// 	name: "Granite Hill", 
// 	image: "http://www.cityofwashburn.org/uploads/7/0/4/7/70473445/8666847.jpg?464" ,
// 	description: "Use Granite Hill"
// }, function(err, campground){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log("Newly CG");
// 		console.log(campground);
// 	}
// });




/*
Adding Paths for Application
using Express Framework
*/

// Root path
app.get("/", function(req, res){
	res.render("landing");
});

// Index Route - Show all campgrounds
app.get("/campgrounds", function(req, res){
	// Get campgrounds from db
	Campground.find({}, function(err, Allcampgrounds){
		if (err){
			console.log(err);
		} else {
			res.render("index", {campgrounds:Allcampgrounds});
		}
	});

});

// Create Route - Add new Camp to DB
app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});


// New Route - Show form to create new campground
app.post("/campgrounds", function(req, res){
	// Get data from form and add to campgrounds array
	// redirect baack to /campgrounds
	var name = req.body.name
	var img = req.body.image
	var description = req.body.description;
	var newCampground = {
		name: name,
		image: img,
		description: description
	};
	
	Campground.create(newCampground, function(err, newlycreated){
		if (err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	})

});

// Show Route - Shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
	// Find campground with provided ID
	Campground.findById(req.params.id, function(err, foundCamp){
		if (err){
			console.log(err);
		} else {
			res.render("show", {campground: foundCamp});
		}
	});
});


// Start Server
app.listen(3000, function(){
	console.log('Connected to YelpCamp Server');
});