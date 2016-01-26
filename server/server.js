var express = require('express');
var bodyParser = require('body-parser');
// var session = require('express-session');
var morgan = require('morgan');
var pg = require('pg');
var app = express();

// Databse connectionn

// Middleware. Add below as needed

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));// this serves all the static assests in the /client folder
//app.use(express.cookieParser('shhhh, very secret'));// used for Auth uncomment when ready
// app.use(session({secret: 'somesecret'})); // used for Auth

//require('./utils/routes.js')(app, express);

var port = process.env.PORT || 5001;

app.listen(port, function() {
	console.log('Sifting on port= ', port)
});

module.exports = app;