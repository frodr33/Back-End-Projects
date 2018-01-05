var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	methodOverride = require("method-override");

/*
Set up Application
*/
mongoose.connect("mongodb://localhost/RESTfulBlog");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

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

// NEW Route (Form then submits to Create Route)
app.get("/blogs/new",function(req, res){
	res.render("new");
});

// CREATE Route
app.post("/blogs", function(req, res){
	// create blog
	Blog.create(req.body.blog, function(err ,newBlog){
		if (err){
			console.log(err);
		} else {
			// redirect
			res.redirect("/blogs");
		}
	});
});

// SHOW Route
app.get("/blogs/:id", function(req,res){
	// req.params are in route address
	// req.body come from forms
	Blog.findById(req.params.id , function(err, foundBlog){
		if (err){
			res.redirect("/blogs");
		} else {
			res.render("shows", {blog: foundBlog});
		}
	});
});

// EDIT Route
app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id , function(err, foundBlog){
		if (err){
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog: foundBlog});
		}
	});
});

// UPDATE Route
// NOTE: put requests are not supported by HTML, 
// thus we need package method-override and ?_method=PUT
// on forms
app.put("/blogs/:id", function(req, res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedPBlog){
		if (err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	});

});

// Delete Route
app.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if (err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	});
});

/*
Set up Server
*/
app.listen(3000, function(){
	console.log("server on");
});