// add links to controllers here
var dbController = require('../controllers/dbcontrollers.js');
var userController = require('../controllers/userController.js')
var passport = require('passport');
var utils = require('./utils')

module.exports = function(app, express, ensureAuth) {

  // local authentication
  app.post('/api/users', userController.createLocalUser, function(req, res) {
    res.redirect('/#/signin');
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
    console.log('/user was called.')
    console.log('req.user: ', req.user)
    res.json(req.user)
  })

  //logout
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/#/signin')
  });

  // external routs for users to access their data
  app.get('/sand/:tablename/:username', dbController.getOneTable);
  app.post('/sand/:tablename/:username', dbController.postToTable);
  app.put('/sand/:tablename/:username/:rowId', dbController.updateValue);
  app.delete('/sand/:tablename/:username/:rowId', dbController.deleteRow);
 
  // endpoints for creating, receiving, and deleting tables
  app.post('/api/users/tables', dbController.createUserTable);
  app.get('/api/users/tables', dbController.getTables);
  app.put('/api/users/tables', dbController.getTables); // do we need to have users update their tables?
  app.delete('/api/users/tables', dbController.deleteTable);

}

