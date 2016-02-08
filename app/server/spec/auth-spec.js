
var pg = require('pg');
var db = require('../utils/dbconnect.js');
var expect = require('../../node_modules/chai/chai').expect;
var bcrypt = require('bcrypt-nodejs');
var sinon = require('sinon');
var userController = require('../controllers/userController.js');
var request = require('request');

describe("Authenticating Users", function() {
  var client;

  beforeEach(function(done) {
    client = new pg.Client(db.connectionString);
    client.connect();

    var UserTablename = "users";

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    client.query("DROP TABLE IF EXISTS " + UserTablename);

    client.query('CREATE TABLE IF NOT EXISTS users (' +
      'id SERIAL PRIMARY KEY, ' +
      'username VARCHAR(120), ' +
      'displayName VARCHAR(120), ' +
      'password VARCHAR(120) DEFAULT null,' +
      'email VARCHAR(120), ' +
      'salt VARCHAR(60) DEFAULT null,' +
      'github VARCHAR(120) DEFAULT false )', function(err, result) {
        if (err) { throw new Error(err); }
        console.log('users table created');
        done();
    })
  });

  afterEach(function() {
    client.end();
  });

  it("Should write to the database", function(done) {
    user = {
      email: 'erikdbrown@gmail.com',
      displayName: 'Erik Brown',
      password: 'p@ssw0rd',
      salt: 'Hello Dolly'
    }
    client.query('INSERT INTO users (username, displayName, password, email, salt) VALUES ($1, $2, $3, $4, $5)', [user.email, user.displayName, user.password, user.email, user.salt], function(err, results) {
      if (err) { throw new Error(err); }
      client.query('SELECT * FROM users', function(err, results) {
        expect(results.rows.length).to.equal(1);
        done();
      })
    })
  });

  it("Should add a user to the database", function(done) {
    // Post the user to the chat server.
    request({ method: "POST",
              uri: "http://127.0.0.1:5001/api/users/",
              json: { email: "erikdbrown@gmail.com", first: 'Erik', last: 'Brown', password: 'p@ssw0rd' }
    }, function(error, res, body) {
      var queryString = "SELECT * FROM users";
      var queryArgs = [];

      client.query(queryString, function(err, results) {
        console.log('query results', results.rows)
        expect(results.rows.length).to.equal(1);
        expect(results.rows[0].username).to.equal("erikdbrowngmailcom");

        done();
      });
    });
  });



  it("Should return 403 if a username is already in the database", function(done) {
    request({ method: "POST",
              uri: "http://127.0.0.1:5001/api/users/",
              json: { email: "erikdbrown@gmail.com", first: 'Erik', last: 'Brown', password: 'p@ssw0rd' }
    }, function(error, res, body) {
        request({ method: "POST",
                  uri: "http://127.0.0.1:5001/api/users/",
                  json: { email: "erikdbrown@gmail.com", first: 'Erik', last: 'Brown', password: 'p@ssw0rd' }
        }, function(error, res, body) {
          expect(res.statusCode).to.equal(403);
          done();
        });
    })
  });

  it("Should store a hashed password to the database", function(done) {
      request({ method: "POST",
              uri: "http://127.0.0.1:5001/api/users/",
              json: { email: "erikdbrown@gmail.com", first: 'Erik', last: 'Brown', password: 'p@ssw0rd' }
    }, function(error, res, body) {
      var queryString = "SELECT * FROM users";
      var queryArgs = [];

      client.query(queryString, queryArgs, function(err, results) {
        expect(results.rows[0].password).to.not.equal('p@ssw0rd');
        bcrypt.compare('p@ssw0rd', results.rows[0].password, function(err, isMatch) {
          expect(isMatch).to.equal(true);

          done();
        })
      });
    });
  });

  it("Should return 404 from login if user does not exist", function(done) {
      request({ method: "POST",
              uri: "http://127.0.0.1:5001/api/users/login",
              json: { email: "erikdbrown@gmail.com", first: 'Erik', last: 'Brown', password: 'p@ssw0rd' }
    }, function(req, res) {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });

  // it("Should return a JWT token", function(done) {
  //   request({ method: "POST",
  //             uri: "http://127.0.0.1:5001/api/users",
  //             json: { email: "erikdbrown@gmail.com", first: 'Erik', last: 'Brown', password: 'p@ssw0rd' }
  //           }, function () {
  //             request({ method: "POST",
  //               uri: "http://127.0.0.1:5001/api/users/login",
  //               json: { username: "erikdbrown@gmail.com", password: 'p@ssw0rd' }
  //             }, function(req, res) {
  //               expect(res.body.token).to.not.equal(undefined);
  //               done();
  //             })
  //           })
  // });

  // it("Should return a GitHub authenticated user", function(done) {

  // });

  // it("Should save GitHub authenticated user to database", function(done) {

  // });
});
