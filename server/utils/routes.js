// add links to controllers here
var db = require('../controllers/dbcontrollers.js');
var userController = require('../controllers/userController.js')
var passport = require('passport');

module.exports = function(app, express) {

 // add auth routes here	
  app.get('/api/users'/***/);
  app.post('/api/users', userController.createLocalUser);
  app.post('/api/users/login', userController.loginLocalUser);
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) { // TODO: redirect to correct login route
    // Successful authentication, redirect home.
    res.redirect('/');
  });
 
  // these are the endpoints each user will have access to

  app.post('/api/schema:id', db.postUserSchema);


  // app.get('/api/schema'/***/);


  // app.post('/api/:username');
  // app.get('/api/:username'/***/);
  // app.put('/api/:username'/***/);
  // app.delete('/api/:username'/***/);

}

