// TODO: link to database
var db // = database connection
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;
var jwt = require('jwt-simple');

// create the Users table
db.query('CREATE TABLE users (' +
  'id INT(11) NOT NULL AUTO_INCREMENT, ' +
  'username VARCHAR(120), ' +
  'password VARCHAR(60)' +
  'salt VARCHAR(22)' +
  'github VARCHAR(5) DEFAULT false' +
  'PRIMARY KEY(id)', function(err, result) {
    if (err) { throw new Error(err); }
    console.log('users table created');
})

module.exports = {

  createLocalUser: function(req, res) {
    var user = {
      username: req.username,
      password: req.password,
      github: false
    };

    db.query('SELECT * FROM users WHERE username = ' + user.username, function(err, rows) {
      if (err) { throw new Error(err); }
      if (rows) {
        res.sendStatus(403); // username exists
      } else {
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
          if (err) { return next(err); } // TODO: make sure this is going somewhere

          bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); } // TODO: make sure this is going somewhere

            user.password = hash;
            user.salt = salt;

            db.query('INSERT INTO users (username, password, salt) VALUES (?,?,?)', [user.username, user.password, user.salt], function(err, response) {
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
    db.query('SELECT password FROM users WHERE username = ' + req.username, function(err, rows, fields) {
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