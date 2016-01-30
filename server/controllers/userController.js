var pg = require('pg');
var db = require('../utils/dbconnect.js');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;
var jwt = require('jwt-simple');
var request = require('request');


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
  'githubToken VARCHAR(60) DEFAULT false )', function(err, result) {
    if (err) { throw new Error(err); }
    console.log('users table created');
})

userMethods = {

  getUser: function(req, res, next) {
    // console.log(req);
    next()
  },

  isUserInDB: function(user, callback) {
    client.query('SELECT username, githubToken FROM users WHERE username=($1)', [user.username], function(err, rows) {
      if (err) { throw new Error(err); }
      var inDB = rows.rows.length > 0;
      callback(inDB);
    });
  },

  findUser: function(user, callback) {
    client.query('SELECT * FROM users WHERE username=($1)', [user.username], function(err, rows) {
      if (err) { throw new Error(err); }
      if (rows.rows.length === 0) {
        callback(null, null) // user does not exist
      } else {
        callback(null, rows.rows[0])
      }
    })
  },

  findOrCreateGitHubUser: function(user, accessToken, refreshToken, next) {
    client.query('SELECT username, githubToken FROM users WHERE username=($1)', [user._json.email], function(err, rows) {
      if (err) { throw new Error(err); }
      if (rows.rows.length === 0) { // does not exist, create a new one
        userMethods.createGitHubUser(user, accessToken, function(err, newUser) {
          next(null, newUser)
        })
      } else {
        var dbUser = rows.rows[0];
        if (dbUser.githubToken === false) {
          next(null, false, { message: 'Sign in with your username and password' })
        }
        if (dbUser.githubToken !== accessToken) {
          userMethods.updateToken(dbUser, refreshToken, function() {
            dbUser.githubToken = refreshToken;
            next(null, dbUser);
          });
        } else {
          next(null, dbUser)
        }
      }
    })
  },

  validatePassword: function(storedHash, password, callback) {

    bcrypt.compare(password, storedHash, function(err, isMatch) {
      console.log('used compare')
      if (err) { throw new Error(err); }
      callback(isMatch);
    })
  },

  createLocalUser: function(req, res, next) {

    var user = {
      username: req.body.email,
      displayName: req.body.first + ' ' + req.body.last,
      password: req.body.password,
      email: req.body.email,
    };

    userMethods.isUserInDB(user, function(inDB) {
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
              var token = jwt.encode(user.username, 'greenVeranda');
              res.json = { token: token };
              next();
            })
          })
        })
      }
    })
  },

  // loginLocalUser: function(req, res) {
  //   var username = req.body.username;

  //   client.query('SELECT password FROM users WHERE username=($1)', [username], function(err, rows, fields) {
  //     if (err) { throw new Error(err); }
  //     if (rows.rows.length === 0) {
  //       res.sendStatus(404); // username does not exist
  //     } else {
  //       var dbPassword = rows.rows[0].password;
  //       bcrypt.compare(req.body.password, dbPassword, function(err, isMatch) {
  //         if (err) { throw new Error(err); }
  //         if (!isMatch) {
  //           res.sendStatus(401); // invalid username or password
  //         } else {
  //           var token = jwt.encode(username, 'greenVeranda');
  //           res.json({
  //             token: token
  //           });
  //         }
  //       })
  //     }
  //   })
  // },

  updateToken: function(user, token, callback) {
    client.query('UPDATE users SET githubToken = ($1) WHERE username = ($2)', [token, user.username], callback);
  },

  createGitHubUser: function (profile, token, callback) {
  
    var user = {
      username: profile._json.email,
      displayName: profile._json.name,
      email: profile._json.email,
      githubToken: token
    };

    client.query('INSERT INTO users (username, displayName, email, githubToken) VALUES ($1, $2, $3, $4)', [user.username, user.displayName, user.email, user.githubToken], function(err, res) {
      if (err) { next(err); }
      var token = jwt.encode(user.username, 'greenVeranda');
      user.token = token;
      callback(null, user);
    })
  },

  loginGitHubUser: function(profile, callback) {
    callback(null, profile);
  }
}

module.exports = userMethods;