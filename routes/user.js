var mongoose = require('mongoose'),
	db_c = require('../config/db'),
	User = require('../models/User.js');


/* DataBase connection */
mongoose.connect('mongodb://' + db_c.config.user + ':' + db_c.config.pass + '@' + db_c.config.host + ':' + db_c.config.port + '/' + db_c.config.name);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("connection to DataBase is OK");
});

/*
 * GET users listing.
 */
exports.getUser = function(req,res){
	User.find({},function (err, users) {
		if (err) return handleError(err);
		res.json(users);

	});
}

/*
 * GET users listing.
 */
exports.register = function(req,res){
	User.findOne({ email:req.body.email }, function (err, user){
		if(!err && null==user){
			var newUser = new User({
				name : req.body.username,
				password : req.body.password,
				email : req.body.email
			})
			/* Save the new Chan */

			newUser.save(function (err) {
				if (err){
					res.json({error:1,msg:err});
				}else{
					res.json(newUser);
				}
			});
		}else{
			res.json({error:1,msg:"User Already Exists"});
		}
	});
}

/* User Log In */
exports.loggedIn = function(req,res){
		res.send(req.isAuthenticated() ? req.user : '0');
}

