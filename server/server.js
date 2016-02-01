var express = require('express');
var bodyParser = require('body-parser');
// var githubAuth = require('./auth/githubAuth.js');
var passport = require('passport');
var session = require('express-session');
var GitHubStrategy = require('passport-github').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var userController = require('./controllers/userController.js')
var token = require('./auth/authTokens.js');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var pg = require('pg');
var app = express();
var cors = require('cors');

// Databse connectionn

// Middleware. Add below as needed
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser('secret'));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
require('./utils/routes.js')(app, express, utils.isAuth);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
	userController.findUser({ username: user.username }, function(err, user) {
		done(err, user);
	});
});

passport.use(new LocalStrategy(
	function(username, password, done) {
		userController.findUser({ username: username }, function(err, user) {
			if (err) { done(err); }
			if (!user) {
				done(null, false) // user does not exist
			}
			if (user.githubtoken !== 'false') {
				done(null, false, { message: 'Please sign in with your GitHub account.' })
			} else {
				userController.validatePassword(user.password, password, function(matched) {
					if (matched) {
						done(null, user);
					} else {
						done(null, false);
					}
				})
			}
		})
}))

var port = process.env.PORT || 5001;

app.listen(port, function() {
	console.log('Sifting on port= ', port)
});

module.exports = app;
