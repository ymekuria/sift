var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var GitHubStrategy = require('passport-github').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var userController = require('./controllers/userController.js');
// var socketController = require('./controllers/socketController.js');
var token = require('./auth/authTokens.js');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var utils = require('./utils/utils')
var pg = require('pg');
var app = express();
var cors = require('cors');

// Middleware. Add below as needed
// app.use(cors());
// app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
require('./utils/routes.js')(app, express, utils.isAuth);


// var io = require('socket.io')(server);

// io.sockets.on('connection', function (socket) {
// 	socket.on('show table', function(table) {
// 		// send DB table info back to client
// 	})

// 	socket.on('edit', function(node) {
// 		// edit node and send data back to client
// 		socketController.editNode(node, function(data) {
// 			socket.emit('data change', data);
// 		})
// 	});

// 	socket.on('add', function(node) {
// 		// add node to database and send data back to client
// 		socketController.addNode(node, function(data) {
// 			socket.emit('data change', data);
// 		})
// 	});

// 	socket.on('delete', function(node) {
// 		// delete node from database and send data back to client
// 		socketController.removeNode(node, function(data) {
// 			socket.emit('data change', data);
// 		})
// 	})
// });

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
	userController.findUser(email, function(err, user) {
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
		userController.findUser(username, function(err, user) {
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

var port = process.env.PORT || 5001;

module.exports.server = app.listen(port, function() {
	console.log('Sifting on port= ', port)
});

module.exports.app = app;
