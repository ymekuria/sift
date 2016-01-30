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
var cors = require('cors');
var pg = require('pg');
var app = express();
var cors = require('cors');

// Databse connectionn

// Middleware. Add below as needed
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));// this serves all the static assests in the /client folder
//app.use(express.cookieParser('shhhh, very secret'));// used for Auth uncomment when ready
app.use(session({secret: 'verandas', resave: true, saveUninitialized: false })); // used for Auth
app.use(passport.initialize());
app.use(passport.session());

require('./utils/routes.js')(app, express);


passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  userController.findUser({ username: username }, function(err, user) {
      if (err) { return done(err); }

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    })
});

passport.use(new GitHubStrategy({
  clientID: token.CLIENT_ID,
  clientSecret: token.CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:5001/auth/callback'
},
  function(accessToken, refreshToken, profile, done) {
    userController.findOrCreateGitHubUser(profile, accessToken, refreshToken, function(err, user) {
      if (err) { done(err); }
      done(null, user);
    })    
}));

passport.use(new LocalStrategy(
  function(username, password, done) {
    userController.findUser({ username: username }, function(err, user) {
      if (err) { return done(err); }

      if (user && !user.password) {
        return done(null, false, { message: 'Please sign in with your GitHub account' });
      } else if (!user) {
        return done(null, false);
      } else {
        userController.validatePassword(user.password, password, function(isMatch) {
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false); // TODO: redirect to signin rather than signup
          }
        })
      }
    })
}));

var port = process.env.PORT || 5001;


app.listen(port, function() {
	console.log('Sifting on port= ', port)
});

module.exports = app;
