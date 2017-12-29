var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];
// Need this for using body-parser everytime
app.use(bodyParser.urlencoded({extended: true}));

// Dont have to write .ejs extensions
app.set("view engine", "ejs");

// Root Route
app.get("/", function(req, res){
	res.render("home");
});

// friends Route
app.get("/friends", function(req,res){
	// Need to move this variable outside becase
	// Can't update list since from form data since
	// this list is a local variable. This will be
	// solved once we start using MongoDB
	//var friends = ["Tony", "Miranda", "Justin", "Pierre", 
	//"Lily"];
	res.render("friends", {friends: friends});
});

// Post
app.post("/addfriend", function(req, res){
	// Express does not automatically create
	// req.body! Need to install body-parser
	// NOTE: Notice how .newFriend is referring
	// to the "name" of the input tag!
	console.log(req.body.newFriend);
	var newfriend = req.body.newFriend;
	friends.push(newfriend);
	res.redirect("/friends");
});


// Start server
app.listen(3000, function(){
	console.log("Server has started");
});