// add links to controllers here


module.exports = function(app, express) {

 // add auth routes here	
  app.get('/api/users'/***/);
  app.post('/api/users'/***/);

  
  // these are the endpoints each user will have access to
  app.post('/api/schema'/***/);
  app.get('/api/schema'/***/);


  app.post('/api/:username'/***/);
  app.get('/api/:username'/***/);
  app.put('/api/:username'/***/);
  app.delete('/api/:username'/***/);

}

