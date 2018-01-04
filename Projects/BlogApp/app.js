var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");

/*
Set up Application
*/
mongoose.connect("mongodb://localhost/RESTfulBlog");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

/*
Schema-Mongoose setup
*/
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now()}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: "Test Blog",
// 	image: "https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634_960_720.png",
// 	body: "Hello, blog post"
// });

/*
Restful Routes
*/
app.get("/", function(req, res){
	res.redirect("/blogs");
});

// INDEX Route
app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if (err){
			console.log(err);
		} else {
			res.render("index", {blogs: blogs});
		}
	});
});


/*
Set up Server
*/
app.listen(3000, function(){
	console.log("server on");
});