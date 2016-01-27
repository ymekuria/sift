var pg = require('pg');
var db = require('../utils/dbconnect.js');
var request = require('request'); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;
var bcrypt = require('bcrypt-nodejs');
var sinon = require('sinon');
var userController = require('../controllers/userController.js');

describe("Persistent Node Server", function() {
  var client;

  beforeEach(function(done) {
    client = new pg.Client(db.connectionString);
      
    client.connect();

    var UserTablename = "users";

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    client.query("DROP TABLE " + UserTablename, done);

    client.query('CREATE TABLE users (' +
      'id SERIAL PRIMARY KEY, ' +
      'username VARCHAR(120), ' +
      'password VARCHAR(60),' +
      'salt VARCHAR(60),' +
      'github VARCHAR(5) DEFAULT false )', function(err, result) {
      if (err) { throw new Error(err); }
      console.log('users table created');
      })
  });

  afterEach(function() {
    client.end();
  });

  it("Should write to the database", function(done) {
    user = {
      username: 'erikdbrown',
      password: 'p@ssw0rd',
      salt: 'Hello Dolly'
    }
    client.query('INSERT INTO users (username, password, salt) VALUES ($1, $2, $3)', [user.username, user.password, user.salt], function(err, results) {
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
              json: { username: "erikdbrown", password: 'p@ssw0rd' }
    }, function(error, res, body) {
      var queryString = "SELECT * FROM users";
      var queryArgs = [];

      client.query(queryString, queryArgs, function(err, results) {
        expect(results.rows.length).to.equal(1);
        expect(results.rows[0].username).to.equal("erikdbrown");

        done();
      });
    });
  });

  it("Should return 403 if a username is already in the database", function(done) {
    request({ method: "POST",
              uri: "http://127.0.0.1:5001/api/users/",
              json: { username: 'erikdbrown', password: 'p@ssw0rd' } 
    }, function(error, res, body) {
        request({ method: "POST",
                  uri: "http://127.0.0.1:5001/api/users/",
                  json: { username: 'erikdbrown', password: 'p@ssw0rd' } 
        }, function(error, res, body) {
          expect(res.statusCode).to.equal(403);
          done();
        });
    })
  });

  it("Should store a hashed password to the database", function(done) {
      request({ method: "POST",
              uri: "http://127.0.0.1:5001/api/users/",
              json: { username: "erikdbrown", password: 'p@ssw0rd' }
    }, function () {
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

  it("Should call loginLocalUser when attempting to log in with useranme and password", function(done) {
    var spy = sinon.spy(userController, 'loginLocalUser');
    request({ method: "POST",
              uri: "http://127.0.0.1:5001/api/users/login",
              json: { username: "erikdbrown", password: 'p@ssw0rd' }
    }, function() {
      sinon.assert.calledOnce(spy);
      done();
    });
  });

  it("Should return 404 from login if user does not exist", function(done) {
      request({ method: "POST",
              uri: "http://127.0.0.1:5001/api/users/login",
              json: { username: "erikdbrown", password: 'p@ssw0rd' }
    }, function (req, res) {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });

  it("Should return a token containing encoded username after login", function(done) {
    request({ method: "POST",
              uri: "http://127.0.0.1:5001/api/users/login",
              json: { username: "erikdbrown", password: 'p@ssw0rd' }
            }, function () {
              request({ method: "POST",
                uri: "http://127.0.0.1:5000/users/login",
                json: { username: "erikdbrown", password: 'p@ssw0rd' }
              }, function(req, res) {
                expect(res.data.token).to.not.equal(undefined);
                var username = jwt.decode(res.data.token);
                expect(username).to.equal('erikdbrown');
              })
            })
  });
});
