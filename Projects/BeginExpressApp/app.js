/* This application will contain 3 different
	routes:
		- "/" prints "Hi there, welcome to my
			assignment!"
		- "/speak/pig" prints "The pig says 'Oink'"
		- "/speak/cow" prints ".....'Moo'"
		- "/speak/dog" prints ".....'Woof Woof!'"
		- "/repeat/hello/3" prints "hello hello hello"
		- "/repeat/hello/5" prints "hello hello hello hello hello"
		- "/repeat/blah/2" prints "blah blah"
*/
var exp = require("express");
var app = exp();

// Route 1
app.get("/", function(req, res){
	res.send("Hi there, welcome to my assignment!");
});

// Route 2
app.get("/speak/:animal", function(req, res){
	var animal = req.params.animal.toLowerCase();

	/* 1st way using If statements
	var sound;
	if (animal === "pig"){
		sound = "Oink";
	} else if (animal === "cow"){
		sound = "Moo";
	} else if (animal == "dog"){
		sound = "Woof Woof!";
	} else {
		res.send("THIS IS NOT A VALID LINK.");
	}
	*/

	// Other way using List
	var sounds = {
		pig: "Oink",
		cow: "Moo",
		dog: "Woof Woof!",
		cat: "I hate you human",
		goldfish: "...."
	}
	var sound = sounds[animal];

	res.send("The " + animal + " says " + "'" + 
		sound + "'");
	
});

// Route 3
app.get("/repeat/:word/:num", function(req, res){
	console.log("INSIDE");
	var num = Number(req.params.num);
	var str = req.params.word;
	var result = "";

	for (var i = 0; i < num; i++){
		result += str + " ";
	}
	res.send(result);

});

app.get("*", function(req, res){
	res.send("PAGE NOT FOUND");
});


// Set up the server
app.listen(3000, function(){
	console.log("YOU ARE CONNECTED TO SERVER");
});