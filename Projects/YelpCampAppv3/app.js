var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	Campground = require("./models/campground.js"),
	Comment = require("./models/comments.js");
	seedDB = require("./seeds");
 
seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


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
			res.render("campgrounds/index", {campgrounds:Allcampgrounds});
		}
	});

});

// Create Route - Add new Camp to DB
app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new.ejs");
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
	});

});

// Show Route - Shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
	// Find campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
		if (err){
			console.log(err);
		} else {
			console.log(foundCamp);
			// render show template with that campground
			res.render("campgrounds/show", {campground: foundCamp});
		}
	});
});


// =======================
// 	   COMMENTS ROUTES
// =======================

app.get("/campgrounds/:id/comments/new", function(req, res){
	// Find campground by ID
	Campground.findById(req.params.id, function(err, camp){
		if (err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: camp});
		}
	});
	
});

app.post("/campgrounds/:id/comments", function(req, res){
	// lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if (err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// Create new Comment
			Comment.create(req.body.comment, function(err, comment){
				if (err){
					console.log(err);
				} else {
					campground.comments.push(comment._id);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
	
});

// Start Server
app.listen(3000, function(){
	console.log('Connected to YelpCamp Server');
});