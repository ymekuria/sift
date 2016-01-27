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
  'displayName VARCHAR(120), ' +
  'password VARCHAR(60) DEFAULT null,' +
  'email VARCHAR(120), ' +
  'salt VARCHAR(60) DEFAULT null,' +
  'github VARCHAR(5) DEFAULT false )', function(err, result) {
    if (err) { throw new Error(err); }
    console.log('users table created');
})

module.exports = {

  isUserInDB: function(user, callback) {
    client.query('SELECT * FROM users WHERE username=($1)', [user.username], function(err, rows) {
      if (err) { throw new Error(err); }
      var inDB = rows.rows.length > 0;
      callback(inDB);
    });
  },

  createLocalUser: function(req, res) {
    var user = {
      username: req.body.email,
      displayName: req.body.first + ' ' + req.body.last,
      password: req.body.password,
      email: req.body.email,
    };

    module.exports.isUserInDB(user, function(inDB) {
      if (inDB) {
        res.sendStatus(403); // username exists
      } else {
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
          if (err) { return next(err); } // TODO: make sure this is going somewhere

          bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); } // TODO: make sure this is going somewhere

            user.password = hash;
            user.salt = salt;

            client.query('INSERT INTO users (username, displayName, password, email, salt) VALUES ($1, $2, $3, $4, $5)', [user.username, user.displayName, user.password, user.email, user.salt], function(err, response) {
              if (err) { throw new Error(err); }
              // TODO: May be able to pull userID from response and send back to client
              res.sendStatus(200);
            })
          })
        })
      }
    })
  },

  loginLocalUser: function(req, res) {
    var username = req.body.username;
    console.log('loginLocalUser was called');

    client.query('SELECT password FROM users WHERE username=($1)', [username], function(err, rows, fields) {
      if (err) { throw new Error(err); }
      if (rows.rows.length === 0) {
        res.sendStatus(404); // username does not exist
      } else {
        var dbPassword = rows.rows[0].password;
        bcrypt.compare(req.body.password, dbPassword, function(err, isMatch) {
          if (err) { throw new Error(err); }
          if (!isMatch) {
            res.sendStatus(401); // invalid username or password
          } else {
            var token = jwt.encode(username, 'greenVeranda');
            res.json({
              token: token
            });
          }
        })
      }
    })
  },

  createGitHubUser: function (profile, callback){
  // profileObj equals the userinfo that google sends upon signin
    var user = {};
    // creates a user object with only the info we want from google
    user.username = profileObj._json.email;
    user.displayName = profileObj._json.name;
    user.email = profileObj._json.email;
    user.github = true;

    client.query('INSERT INTO users (username, displayName, email, github) VALUES ($1, $2, $3)', [user.username, user.displayName, user.email, user.github], function(err, response) {
      if (err) { throw new Error(err); }
      // TODO: May be able to pull userID from response and send back to client
      res.sendStatus(200);
    })

    return callback(null, user);
  }
}