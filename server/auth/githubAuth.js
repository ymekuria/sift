var userController = require('../controllers/userController.js');

exports.ensureAuth = function (req, res, next){
  // isAuthenticated is provided function that checks if the user is logged in to google
  if (req.isAuthenticated()) { return next(); }
  // if logged in continue loading page
  res.send();
  // otherwise redirect to signin
  // redirect wasn't working here so we instead send nothing to the client
  // the client side checks if the res is empty and if it is redirects to signin
};

exports.createGitHubUser = function (profile, callback){
  // profileObj equals the userinfo that google sends upon signin
  var user = {};
  // creates a user object with only the info we want from google
  user.username = profileObj._json.email;
  user.displayName = profileObj._json.name;
  user.password = null;
  user.email = profileObj._json.email;
  user.salt = null;
  user.github = true;

  

  return callback(null, user);
};

exports.login = function (profileObj, callback){
  return callback(null, profileObj);
};