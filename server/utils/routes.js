// add links to controllers here
var db = require('../controllers/dbcontrollers.js');
var userController = require('../controllers/userController.js')


module.exports = function(app, express) {

 // add auth routes here	
  // app.get('/api/users'/***/);
  app.post('/api/users', userController.createLocalUser);
  app.post('/api/users/login', userController.loginLocalUser);
 
  // these are the endpoints each user will have access to
  // app.post('/api/schema');

  // app.get('/api/schema'/***/);


  // app.post('/api/:username');
  // app.get('/api/:username'/***/);
  // app.put('/api/:username'/***/);
  // app.delete('/api/:username'/***/);

}

