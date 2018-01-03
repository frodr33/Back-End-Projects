var mongoose = require("mongoose");


// Adding a new cat to DB
mongoose.connect("mongodb://localhost/cat_app");

// Make cat template
var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

// Make model to make new cats
// "Cat" is the singular version
// and Mongoose makes a collection
// called "cats" Sautomatically
var Cat = mongoose.model("Cat", catSchema);

// // Retrive all cats from the DB
// var george = new Cat({
// 	name: "Ms. Norris",
// 	age: 7,
// 	temperament: "Evil" 
// });

// george.save(function(err, cat){
// 	if (err){
// 		console.log("ERROR");
// 	} else {
// 		console.log("Successfully saved cat to DB");
// 		console.log(cat);
// 	}
// });

// Combines new and save steps!
Cat.create({
	name: "Snow White",
	age: 15,
	temperament: "Bland"
}, function(err, cat){
	if (err) {
		console.log(err);
	} else {
		console.log(cat);
	}
});

// Retrieve cats from the DB
Cat.find({}, function(err, cats){
	if (err){
		console.log("Error");
		console.log(err);
	} else {
		console.log("Print out the cats")
		console.log(cats)
	}
});