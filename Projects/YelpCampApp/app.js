var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// Body-Parser set up
// Body parser allows express to
// create a req.body object
app.use(bodyParser.urlencoded({extended: true}));

// Declare views folder as ejs
app.set("view engine", "ejs");

	var campgrounds = [
		{name: "Salmond Creek", image: "http://www.poconosbest.com/images/campground.jpg"},
		{name: "Granite Hill", image: "http://www.cityofwashburn.org/uploads/7/0/4/7/70473445/8666847.jpg?464" },
		{name: "Bryson River", image: "https://www.greatsmokies.com/images/Tents-creek-1240.jpg"}
	];
/*
Adding Paths for Application
using Express Framework
*/

// Root path
app.get("/", function(req, res){
	res.render("landing");
});

// Campgrounds path
app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});

// /new shows form that will send data
app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});


// Post Route
app.post("/campgrounds", function(req, res){
	// Get data from form and add to campgrounds array
	// redirect baack to /campgrounds
	var name = req.body.name
	var img = req.body.image
	var newCampground = {
		name: name,
		image: img
	};
	campgrounds.push(newCampground);

	// redirect back to Campgrounds page
	res.redirect("/campgrounds");


});


// Start Server
app.listen(3000, function(){
	console.log('Connected to YelpCamp Server');
});