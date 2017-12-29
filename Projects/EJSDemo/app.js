var express = require("express");
var app = express();



// Root Route
app.get("/", function(req, res){
	// Express looks for views directory
	// need to import ejs (npm install)
	// This is what is meant when there
	// is a module error
	res.render("home.ejs");
});

// 
app.get("/fallinlovewith/:thing", function(req, res){
	var thing = req.params.thing;
	res.render("love.ejs", {thingVar: thing});
});



// Start Server
app.listen(3000, function(){
	console.log("Server is On");
});