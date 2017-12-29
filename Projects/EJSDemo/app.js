var express = require("express");
var app = express();

// Tell express to look for files
// in public directory automatically
// (For all dir that are not "views")
app.use(express.static("public"));

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

app.get("/posts", function(req, res){
	var posts = [
		{title: "Post 1", author: "Suzy"},
		{title: "Post 2", author: "Arthur"},
		{title: "Post 3", author: "Frank"},		
	];
	res.render("posts.ejs", {posts: posts});

});



// Start Server
app.listen(3000, function(){
	console.log("Server is On");
});