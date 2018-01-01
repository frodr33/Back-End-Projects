var mongoose = require("mongoose");


// Adding a new cat to DB
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = monoogse.model("Cat", catSchema);

// Retrive all cats from the DB
// and console.log each one
