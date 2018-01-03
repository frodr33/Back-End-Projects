var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res){
	res.send("Hi there!");
});
// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
	console.log("Someone sent a request to /dog");
	res.send("Goodbye!");
});
// "/dog" => "MEOW!
app.get("/dog", function(req, res){
	res.send("MEOW!");
});

app.get("*", function(req, res){
	res.send("ALL OTHER ROUTES")
})




// Tell Express to listen for requests (start server)
app.listen(3000, function(){
	console.log("Example app listening on port 3000");
});

