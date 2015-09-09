var express = require('express'),
	http = require('http'),
	path = require('path'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	routes = require('./routes'),
	users = require('./routes/user'),
	api = require('./routes/api'),
	User = require('./models/User.js');

//==================================================================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
  function(username, password, done) {
	  User.findOne({ name: username,password:password }, function (err, user){
		  if(!err && null!=user){
			  return done(null, {name: "admin"});
		  }else{
			  return done(null, false, { message: 'Incorrect username.' });
		  }
	  });
  }
));

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Define a middleware function to be used for every secured routes
var auth = function(req, res, next){
  if (!req.isAuthenticated()) {
	  res.send(401);
  }else{
	  next();
	}
};
//==================================================================

// Start express application
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser()); 
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'securedsession' }));
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//==================================================================
// routes
app.get('/',routes.index);

app.get('/users', auth, users.getUser);
app.post('/register', users.register);
app.post('/consumption', api.getConsumption);
app.post('/merchants', api.getMerchantsCategories);
app.post('/customers', api.getCustomerZipcodes);
app.post('/cards', api.getCardsCubes);
//==================================================================

//==================================================================
// route to test if the user is logged in or not
app.get('/loggedin', users.loggedIn);

// route to log in
app.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});

// route to log out
app.post('/logout', function(req, res){
  req.logOut();
  res.send(200);
});
//==================================================================


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
