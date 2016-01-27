var pg = require('pg');
var db = require('../utils/dbconnect.js');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;
var jwt = require('jwt-simple');

var client = new pg.Client(db.connectionString);
client.connect();

// create the Users table
client.query('CREATE TABLE IF NOT EXISTS users (' +
  'id SERIAL PRIMARY KEY, ' +
  'username VARCHAR(120), ' +
  'password VARCHAR(60),' +
  'salt VARCHAR(60),' +
  'github VARCHAR(5) DEFAULT false )', function(err, result) {
    if (err) { throw new Error(err); }
    console.log('users table created');
})

module.exports = {

  createLocalUser: function(req, res) {
    var user = {
      username: req.body.username,
      password: req.body.password,
      github: false
    };

    client.query('SELECT * FROM users WHERE username=($1)', [user.username], function(err, rows) {
      if (err) { throw new Error(err); }
      if (rows.length > 1) {
        res.sendStatus(403); // username exists
      } else {
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
          if (err) { return next(err); } // TODO: make sure this is going somewhere

          bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); } // TODO: make sure this is going somewhere

            user.password = hash;
            user.salt = salt;
            console.log('Salt: ', salt)

            client.query('INSERT INTO users (username, password, salt) VALUES ($1, $2, $3)', [user.username, user.password, user.salt], function(err, response) {
              if (err) { throw new Error(err); }
              console.log(response); // TODO: May be able to pull userID from response and send back to client
              res.sendStatus(200);
            })
          })
        })
      }
    })
  },

  loginLocalUser: function(req, res) {
    client.query('SELECT password FROM users WHERE username = ' + req.username, function(err, rows, fields) {
      if (err) { throw new Error(err); }
      if (!rows) {
        res.sendStatus(404); // username does not exist
      } else {
        var dbPassword = rows.password;
        bcrypt.compare(req.password, dbPassword, function(err, isMatch) {
          if (err) { throw new Error(err); }
          if (!isMatch) {
            res.sendStatus(401); // invalid username or password
          } else {
            var token = jwt.encode(rows.username, 'greenVeranda');
            res.json({
              token: token
            });
          }
        })
      }
    })
  },

  createGitHubUser: function(req, res) {

  }
}