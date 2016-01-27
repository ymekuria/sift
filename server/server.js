var express = require('express');
var bodyParser = require('body-parser');
var githubAuth = require('./auth/githubAuth.js');
var passport = require('passport');
var session = require('express-session');
var GitHubStrategy = require('passport-github').Strategy;
var userController = require('./controllers/userController.js')
var token = require('./auth/authTokens.js');
var morgan = require('morgan');
var pg = require('pg');
var app = express();

// Databse connectionn

// Middleware. Add below as needed

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
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
  clientID: token.CLIENT_ID,
  clientSecret: token.CLIENT_SECRET,
  callbackURL: 'http://localhost:5001/auth/callback'
},
  function(accessToken, refreshToken, profile, done) {
    userController.isUserInDB({ username: profile._json.email }, function(inDB) {
      if (inDB) {
        userController.loginGitHubUser(profile, function(err, profile) {
          return done(err, profile);
        })
      } else {
        userController.createGitHubUser(profile, function(err, user) {
          return done(err, user);
        })
      }
    })
}));

var port = process.env.PORT || 5001;

app.listen(port, function() {
	console.log('Sifting on port= ', port)
});

module.exports = app;