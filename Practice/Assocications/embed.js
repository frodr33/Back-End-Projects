var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");


/*
Set up Schemas. Which are basically allows you
to instantiate an object like in Java. 
	HashMap<Integer> HM = new HashMap<Integer>()
	var newPost = new Post({});
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
	posts: [postSchema] // array of posts
});

var User = mongoose.model("User", userSchema);

/*
Creating/Updating DB
*/
// Find user by name and then push a post
// to the posts array. Then save that post 
// (update database)
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