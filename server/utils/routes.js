// add links to controllers here
var dbController = require('../controllers/dbcontrollers.js');
var userController = require('../controllers/userController.js');
// var socketController = require('../controllers/socketController.js');
var passport = require('passport');

module.exports = function(app, express, ensureAuth) {

  // local authentication
  app.post('/api/users', userController.createLocalUser, function(req, res) {
    res.redirect('/signin');
  });

  app.post('/signin', passport.authenticate('local', { session: true, failureRedirect: '/signin' }), function(req, res) {
    var user = {
      id: req.user.id,
      username: req.user.username,
      displayname: req.user.displayname
    }
    res.json(user);
  });

  // user objet pass-through
  app.get('/user', ensureAuth, function(req, res) {
    var user = {
      id: req.user.id,
      username: req.user.username,
      displayname: req.user.displayname
    }
    res.json(user);
  })

  // GitHub authentication
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback', passport.authenticate('github', { session: true, failureRedirect: '/signin' }), function(req, res) {
    var user = {
      id: req.user.id,
      username: req.user.username,
      displayname: req.user.displayname
    }
    res.redirect('/build');
  });

  //logout
  app.get('/signout', ensureAuth, function(req, res) {
    req.logout();
  });

  // endpoints for creating, receiving, and deleting tables // put back ensurAuth
  app.get('/api/users/tables',  dbController.getTables);
  app.post('/api/users/tables', dbController.createUserTable);
  // app.put('/api/users/tables/:id'); // do we need to have users update their tables?
  app.delete('/api/users/tables/:id', dbController.deleteTable);

  // external routs for users to access their data
  app.get('/sand/:tablename/:username', dbController.getOneTable);
  app.post('/sand/:tablename/:username', dbController.postToTable);
  app.put('/sand/:tablename/:username/:rowId', dbController.updateValue);
  app.delete('/sand/:tablename/:username/:rowId', dbController.deleteRow);
 

}

