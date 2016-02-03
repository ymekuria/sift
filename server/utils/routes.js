// add links to controllers here
var dbController = require('../controllers/dbcontrollers.js');
var userController = require('../controllers/userController.js');
var socketController = require('../controllers/socketController.js');
var passport = require('passport');
var utils = require('./utils');

module.exports = function(app, express, ensureAuth) {

  // local authentication
  app.post('/api/users', userController.createLocalUser, function(req, res) {
    res.redirect('/build');
  });
  app.post('/signin', passport.authenticate('local', { session: true, failureRedirect: '/#/signin' }), function(req, res) {
    res.redirect('/build');
  });

  // GitHub authentication
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/#/signin' }), function(req, res) {
    res.redirect('/build');
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
    res.redirect('/signin')
  });

  // endpoints for creating, receiving, and deleting tables
  app.get('/api/users/tables', dbController.getTables);
  app.post('/api/users/tables', dbController.createUserTable);
  // app.put('/api/users/tables/:id'); // do we need to have users update their tables?
  app.delete('/api/users/tables/:id', dbController.deleteTable);

  // external routs for users to access their data
  app.get('/sand/:tablename/:username', dbController.getOneTable);
  app.post('/sand/:tablename/:username', dbController.postToTable);
  app.put('/sand/:tablename/:username/:rowId', dbController.updateValue);
  app.delete('/sand/:tablename/:username/:rowId', dbController.deleteRow);
 

}

