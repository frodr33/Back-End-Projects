var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");


/*
Set up Schemas
*/
// POST - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

/*
Creating/Updating DB
*/
// Find user by name and update
User.findOne({name: "Frank R"}, function(err, usr){
	if (err){
		console.log(err);
	} else {
		usr.posts.push({
			title: "three things",
			content: "asdf"
		});
		usr.save(function(err, usr){
			if (err){
				console.log(err);
			} else {
				console.log(usr);
			}
		})
	}
});