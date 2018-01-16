var mongoose = require("mongoose");

// POST - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});


// what to return (The model/instantiator)
module.exports = mongoose.model("Post", postSchema);