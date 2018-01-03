var express = require("express");
var app = express();
var bodyParser = require("body-parser");

/*
System Setup
*/

// Body-Parser set up
// Body parser allows express to
// create a req.body object
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine, ejs");


/* 
Routes Set Up 	
*/

// Root path
app.get("/", function(req, res){
	res.render("landing");
});

// Campgrounds path
app.get("/photos", function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});

// /new shows form that will send data
app.get("/photos/new", function(req, res){
	res.render("new.ejs");
});


// Post Route
app.post("/campgrounds", function(req, res){
	// redirect back to Campgrounds page
	res.redirect("/campgrounds");
});

/*
Server Setup
*/

// Start Server
app.listen(3000, function(){
	console.log("Server is starting");
});