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

  app.get('/t/:tablename/:username', dbController.getOneTable);
  app.post('/t/:tablename/:username', dbController.postToTable);
  app.put('/t/:tablename/:username', dbController.updateValue);
  app.delete('/t/:tablename/:username', dbController.deleteRow);
 
  // this endpoint genratesa new table with the fields the user specifys
  app.post('/api/users/tables', dbController.createUserTable);
  // this endpoint 
  app.get('/api/users/tables', dbController.getTables);

  // // these are the endpoints that will be avialable
  app.post('/api/postToTable:usrTable', dbController.postToTable);
  app.get('/api/getOneTable:usrTable', dbController.getOneTable);
  

  app.put('/api/updateValue', dbController.updateValue);
  // // this endpoint deletes the entire table from the database
  app.delete('/api/deleteTable', dbController.deleteTable);

  // // this endpoint deletes a row from a users 
  app.delete('/api/deleteRow', dbController.deleteRow);

}

