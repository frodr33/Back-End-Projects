var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	UserSchema: String,
	password: String,
});

UserSchema.plugin(passportLocalMongoose); // gives Schema Auth functs
module.exports = mongoose.model("User", UserSchema);