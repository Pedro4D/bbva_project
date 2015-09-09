var mongoose = require('mongoose');

/* Mongoose Schemas */
var UserSchema = new mongoose.Schema({

	name : { type: String, index: true },
	password : { type: String, index: true },
	created: { type: Date, default: Date.now }

});

module.exports = mongoose.model('user', UserSchema);