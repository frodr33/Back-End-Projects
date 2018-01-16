var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

var Post = require("./models/posts.js");
var User = require("./models/user.js");

/*
Set up Schemas
*/

// User.create({
// 	email: "bob@gmail.com",
// 	name: "Bob Belcher"
// });


// Create Post and Link it to 
// user, searched by email

Post.create({
	title: "blah blah post 5",
	content: "y0y0y0y0y0"
}, function(err, post){
	User.findOne({email: "bob@gmail.com"}, 
		function(err, foundUser){
			if (err){
				console.log(err);
			} else {
				foundUser.posts.push(post._id);
				foundUser.save(function(err, data){
					if (err){
						console.log(err);
					} else {
						console.log(data);
					}
				});
			}
		});
});

// Find user
// Find all posts for that user
// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
// 	if (err){
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });