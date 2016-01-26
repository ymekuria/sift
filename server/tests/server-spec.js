var pgp = require('pg-promise');
var request = require('request'); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;
var bcrypt = require('bcrypt-nodejs');

describe("Persistent Node Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    db = pgp.("postgres://username:password@host:port/database")
      user: "root",
      password: "",
      database: "chat"
    });
    db.connect();


    var UserTablename = "users";

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    db.query("delete from " + UserTablename);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should add a user to the database", function(done) {
    // Post the user to the chat server.
    request({ method: "POST",
              uri: "http://127.0.0.1:5000/users/",
              json: { username: "erikdbrown", password: 'p@ssw0rd' }
    }, function () {
      var queryString = "SELECT * FROM users";
      var queryArgs = [];

      db.query(queryString, queryArgs, function(err, results) {
        expect(results.length).to.equal(1);
        expect(results[0].username).to.equal("erikdbrown");

        done();
      });
    });
  });

  it("Should store the hashed password to the database", function(done) {
      request({ method: "POST",
              uri: "http://127.0.0.1:5000/users/",
              json: { username: "erikdbrown", password: 'p@ssw0rd' }
    }, function () {
      var queryString = "SELECT * FROM users";
      var queryArgs = [];

      db.query(queryString, queryArgs, function(err, results) {
        expect(results[0].password).to.not.equal('p@ssw0rd');
        bcrypt.compare('p@ssw0rd', results[0].password, function(err, isMatch) {
          expect(isMatch).to.equal(true);

          done();
        })
      });
    });
  });

  it("Should return 404 from login if user does not exist", function(done) {
      request({ method: "POST",
              uri: "http://127.0.0.1:5000/users/login",
              json: { username: "erikdbrown", password: 'p@ssw0rd' }
    }, function (req, res) {
      expect(res.status).to.equal(404);
      done();
    });
  });

  it("Should return a token containing encoded username after login", function(done) {
    request({ method: "POST",
              uri: "http://127.0.0.1:5000/users/",
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
