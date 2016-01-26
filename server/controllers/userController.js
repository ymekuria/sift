// TODO: link to database
var db // = database connection
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

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

            db.query('INSERT INTO users SET ?', user, function(err, response) {
              if (err) { throw new Error(err); }
              console.log(response); // TODO: May be able to pull userID from response and send back to client
              res.sendStatus(200);
            })
          })
        })
      }
    })
  }, 

  createGitHubUser: function(req, res) {
    
  }
}