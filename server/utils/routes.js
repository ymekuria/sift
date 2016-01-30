// add links to controllers here
var dbController = require('../controllers/dbcontrollers.js');
var userController = require('../controllers/userController.js')
var passport = require('passport');

module.exports = function(app, express) {

 // add auth routes here	
  app.get('/api/users'/***/);
  app.post('/api/users', userController.createLocalUser, function(req, res) {
    res.redirect('/');
  });
  app.post('/signin', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/auth/github' }));
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/callback', passport.authenticate('github', { successRedirect: '/', failureRedirect: '/#/signup' }));

  // app.get('/', passport.authenticate('github', {failureRedirect: '#/signup', session: false}), function(req, res){
  //   console.log('you are in the / GET')
  //   res.send('this is the home page');
  // });
 
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

