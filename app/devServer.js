var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var http = require('http');


var app = require('./server/server.js').app;
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(express.static(__dirname + '/client/landingPage'))
app.use(require('webpack-hot-middleware')(compiler));

app.get('/landing', function(req, res) {
  res.sendFile(path.join(__dirname, './client/landingPage/landing.html'));
});
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});


http.createServer(app).listen(process.env.PORT || 3000, function() {
  console.log('Listening on port ' + (process.env.PORT || 3000));
});

