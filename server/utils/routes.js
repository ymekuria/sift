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
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/#/create');
  });

  app.get('/user', function(req, res) {
    console.log('req.user: ', req.user)
    var localUser = {
      username: req.user.username,
      displayname: req.user.displayname
    }
    res.json(localUser)
  })

  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/#/signin' }), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/#/create');
  });
 
  // this endpoint genratesa new table with the fields the user specifys
  app.post('/api/generateTable:usr', dbController.postUserTable);
  // this endpoint 
  app.get('/api/getTables:usr', dbController.getTables);

  // these are the endpoints that will be avialable
  app.post('/api/postToTable:usrTable', dbController.postToTable);
  app.get('/api/getOneTable:usrTable', dbController.getOneTable);
  

  app.put('/api/updateValue', dbController.updateValue);
  // this endpoint deletes the entire table from the database
  app.delete('/api/deleteTable',dbController.deleteTable);

  // this endpoint deletes a row from a users 
  app.delete('/api/deleteRow',dbController.deleteRow);

}

