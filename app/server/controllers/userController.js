var pg = require('pg');
var db = require('../utils/dbconnect.js');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;
var jwt = require('jwt-simple');
var client = require('../utils/dbconnect').client;

var userMethods = {
  isUserInDB: function(user, callback) {
    client.query(
      'SELECT username FROM Users WHERE username=($1)',
      [user.username],
      function(err, rows) {
        if (err) {
          console.log(err);
        }
        var inDB = rows.rows.length > 0;
        callback(inDB);
      }
    );
  },

  findUser: function(email, callback) {
    client.query('SELECT * FROM Users WHERE email=($1)', [email], function(
      err,
      rows
    ) {
      if (err) {
        callback(err);
      }
      if (rows.rows.length === 0) {
        callback(null, null); // user does not exist
      } else {
        callback(null, rows.rows[0]);
      }
    });
  },

  findOrCreateGitHubUser: function(user, accessToken, refreshToken, next) {
    client.query(
      'SELECT id, email, displayname, githubtoken FROM Users WHERE email=($1)',
      [user._json.email],
      function(err, rows) {
        if (err) {
          console.log(err);
        }
        if (rows.rows.length === 0) {
          // does not exist, create a new one
          userMethods.createGitHubUser(user, accessToken, function(
            err,
            newUser
          ) {
            next(null, newUser);
          });
        } else {
          var dbUser = rows.rows[0];
          if (!dbUser.githubtoken) {
            next(null, false, {
              message: 'Sign in with your Sift username and password'
            });
          }
          if (refreshToken) {
            userMethods.updateToken(dbUser, refreshToken, function() {
              dbUser.githubtoken = refreshToken;
              next(null, dbUser);
            });
          } else {
            next(null, dbUser);
          }
        }
      }
    );
  },

  validatePassword: function(storedHash, password, callback) {
    bcrypt.compare(password, storedHash, function(err, isMatch) {
      if (err) {
        console.log(err);
      }
      callback(isMatch);
    });
  },

  createLocalUser: function(req, res, next) {
    var user = {
      username: req.body.email.replace(/[^a-zA-Z0-9 ]/g, ''),
      displayName: req.body.first + ' ' + req.body.last,
      password: req.body.password,
      email: req.body.email
    };

    userMethods.isUserInDB(user, function(inDB) {
      if (inDB) {
        res.status(403).send({ message: 'Email address already registered.' }); // username exists
      } else {
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
          if (err) {
            console.log(err);
          } // TODO: make sure this is going somewhere

          bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
              console.log(err);
            } // TODO: make sure this is going somewhere

            user.password = hash;
            user.salt = salt;

            client.query(
              'INSERT INTO Users (username, displayName, password, email, salt) VALUES ($1, $2, $3, $4, $5)',
              [
                user.username,
                user.displayName,
                user.password,
                user.email,
                user.salt
              ],
              function(err, response) {
                if (err) {
                  console.log(err);
                }
                next();
              }
            );
          });
        });
      }
    });
  },

  updateToken: function(user, token, callback) {
    client.query(
      'UPDATE Users SET githubtoken = ($1) WHERE username = ($2)',
      [token, user.username],
      callback
    );
  },

  createGitHubUser: function(profile, token, callback) {
    var user = {
      username: profile._json.email.replace(/[^a-zA-Z0-9 ]/g, ''),
      displayName: profile._json.name,
      email: profile._json.email,
      githubtoken: token
    };

    client.query(
      'INSERT INTO Users (username, displayName, email, githubtoken) VALUES ($1, $2, $3, $4)',
      [user.username, user.displayName, user.email, user.githubtoken],
      function(err, res) {
        if (err) {
          next(err);
        }
        callback(null, user);
      }
    );
  },

  loginGitHubUser: function(profile, callback) {
    callback(null, profile);
  }
};

module.exports = userMethods;
