// add links to controllers here
var dbController = require('../controllers/dbcontrollers.js');
var userController = require('../controllers/userController.js')
var passport = require('passport');

module.exports = function(app, express) {

  // authentication routes
  app.get('/api/users'/***/);
  app.post('/api/users', userController.createLocalUser, utils.routeToHome);
  
  //local signin and global signout
  app.post('/signin', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/#/signin' }));
  app.get('/signout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  // GitHub Authentication and Signin
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/callback', passport.authenticate('github', { successRedirect: '/user', failureRedirect: '/#/signup' }));

  // app.get('/', utils.isAuth)
 
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

