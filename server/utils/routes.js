// add links to controllers here
var dbController = require('../controllers/dbcontrollers.js');
var userController = require('../controllers/userController.js')
var passport = require('passport');
var utils = require('./utils')

module.exports = function(app, express, ensureAuth) {

  // local authentication
  app.post('/api/users', userController.createLocalUser, function(req, res) {
    res.redirect('/signin');
  });
  app.post('/signin', passport.authenticate('local', { session: true, failureRedirect: '/#/signin' }), function(req, res) {
    res.redirect('/#/create');
  });

  // GitHub authentication
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/#/signin' }), function(req, res) {
    res.redirect('/#/create');
  });

  // user objet pass-through
  app.get('/user', function(req, res) {
    res.json(req.user)
  })

  //logout
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/#/signin')
  });

  // external routs for users to access their data
  app.get('/t/:tablename/:username', dbController.getOneTable);
  app.post('/t/:tablename/:username', dbController.postToTable);
  app.put('/t/:tablename/:username', dbController.updateValue);
  app.delete('/t/:tablename/:username', dbController.deleteRow);
 
  // endpoints for creating, receiving, and deleting tables
  app.post('/api/users/tables', dbController.createUserTable);
  app.get('/api/users/tables', dbController.getTables);
  app.delete('/api/users/tables', dbController.deleteTable);

}

