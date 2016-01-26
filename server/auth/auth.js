var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var token = require('./authTokens.js');

app.use(passport.initialize());
app.use(passport.session());

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });

passport.use(new GitHubStrategy({
  clientID: token.CLIENT_ID,
  clientSecret: token.CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/callback'
},
function(accessToken, refreshToken, profile, done) {
  // TODO: find the user as it is stored in the database
  User.findOrCreate({ githubId: profile.id}, function(err, user) {
    return done(err, user);
  })
}))

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

// app.get('/account', ensureAuthenticated, function(req, res){
//   res.render('account', { user: req.user });
// });

app.get('/login', function(req, res){
  // passes the username to the user
  res.render('login', { user: req.user });
});

app.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this function will not be called.
  });

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
};
