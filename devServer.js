var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = require('./server/server.js');
var compiler = webpack(config);

app.app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.app.use(require('webpack-hot-middleware')(compiler));

app.app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/index.html'));
});
