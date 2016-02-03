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
var utils = require('./utils/utils')
var pg = require('pg');
var cors = require('cors');
var app = express();

// Middleware. Add below as needed
app.use(cors());
app.use(morgan('dev'));
// app.use(cookieParser('secret'));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
require('./utils/routes.js')(app, express, utils.isAuth);

var port = process.env.PORT || 5001;

var server = app.listen(port, function() {
	console.log('Sifting on port= ', port)
});

var io = require('socket.io')(server);

io.on('connection', function (socket) {
	console.log('user connected')
  socket.emit('server event', { foo: 'bar' });
  socket.on('client event', function (data) {
    console.log(data);
  });
});

passport.serializeUser(function(user, done) {
	console.log('serializeUser: ', user)
  done(null, user);
});

passport.deserializeUser(function(user, done) {
	console.log('deserializeUser: ', user)
	userController.findUser({ username: user.username }, function(err, user) {
		done(err, user);
	});
});

passport.use(new GitHubStrategy({
    clientID: token.CLIENT_ID,
    clientSecret: token.CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:5001/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
  	userController.findOrCreateGitHubUser(profile, accessToken, refreshToken, function(err, user) {
  		done(err, user);
  	})
  }
));

passport.use(new LocalStrategy(
	function(username, password, done) {
		console.log('username: ', username);
		console.log('username: ', password);
		userController.findUser({ email: username }, function(err, user) {
			console.log('User: ', user);
			if (err) { done(err); }
			if (!user) {
				done(null, false) // user does not exist
			} else {
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
			}
		})
}))

module.exports = app;
