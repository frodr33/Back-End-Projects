var express = require("express");
var app = express();
var request = require("request");

app.get("/results", function(req, res){
	res.send("Route Works");
	request("http://www.omdbapi.com/?s=california&apikey=thewdb",
		function(error, response, body){
 		console.log('error:', error); // Print the error if one occurred
 		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
 		console.log(body);
		});
});



// Start Server
app.listen(3000, function(){
	console.log("Server has started");
})