var express               = require("express"), // For Routes
	mongoose              = require("mongoose"), // For databases
	passport              = require("passport"), // Auth
	bodyParser            = require("body-parser"), // req.body 
	LocalStrategy         = require("passport-local"), //
	passportLocalMongoose = require("passport-local-mongoose"), // Adds Auth methods to Schemas
	User				  = require("./models/user.js"), // user Model
	expressSession		  = require("express-session"); // Decoding and Encoding



var app = express("express");
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost/auth_demo_app");
app.use(bodyParser.urlencoded({extended: true})); // body-parser

/* Used to Encode and
	Decode Sessions
*/
app.use(expressSession({
	secret: "A Secret?!?!",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize()); // passport setup
app.use(passport.session()); // passport setup

// Uses Local Strategy with the autheticate method
// of User Model. This is how passport knows to get
// username and password below.
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // Encoding
passport.deserializeUser(User.deserializeUser()); // Decoding



/*
Routes
*/

app.get("/", function(req, res){
	res.render("home");
});

// middleware to check if logged in or not
app.get("/secret", isLoggedIn,  function(req, res){
	res.render("secret");
});


// ===============
// Register Routes
// ===============

app.get("/register", function(req, res){
	res.render("register");
});

app.post("/register", function(req, res){
	// Password not saved, but hashed using
	// concept of hash and salt
	User.register(new User({username: req.body.username}), 
		req.body.password, function(err, user){
			if (err){
				console.log(err);
			}
			// Log user in
			// Method is local, vs twitter,
			// or facebook login methods 
			passport.authenticate("local")(req, res,
			 function() {
				res.redirect("/secret");
			});		
		});
});

// ===============
//  Login Routes
// ===============

app.get("/login", function(req, res){
	res.render("login");
});

// Using "Middleware"
// Login Logic
// passport automatically
// takes username and password
app.post("/login", passport.authenticate("local", {                                                                                                                 
	successRedirect: "/secret",
	failureRedirect: "/login"                                                                                                                                    
}), function(req, res){
});

// ===============
//  Logout Routes
// ===============

app.get("/logout", function(req, res){
	req.logout(); // passport destroying userdata in session
	res.redirect("/");
});

// Creating /secret middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next(); // next is like a continue in a loop
	} else {
		res.redirect("/login");
	}
}

app.listen(3000, function(){
	console.log("server started");
});