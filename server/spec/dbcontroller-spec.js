var pg = require('pg');
var db = require('../utils/dbconnect.js');
var request = require('request'); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;
var sinon = require('sinon');
var dbcontroller = require('../controllers/dbcontrollers.js');

describe("Posting User Schemas", function() {
  var client;

  beforeEach(function(done) {
    client = new pg.Client(db.connectionString);
    client.connect();
    done();
  })
 

  afterEach(function(done) {
    client.query("DROP TABLE yonim_test");
    client.end();
    done();
  });

  it("Should write to the database", function(done) {
    client.query('CREATE TABLE IF NOT EXISTS yonim_test ('+
      'firstname VARCHAR(120), ' +
      'lastname VARCHAR(120), ' +
      'streetaddress VARCHAR(200))', function(err, result) {
        if (err) { throw new Error(err); }
        console.log('test table created');
        done();

    data = {
      firstname: 'Yoni',
      lastname: 'Mekuria',
      streetaddress: '5234 Callback Way'
    }
    client.query('INSERT INTO yonim_test (firstname, lastname, streetaddress) VALUES ($1, $2, $3)', [data.firstname, data.lastname, data.streetaddress], function(err, results) {
      if (err) { throw new Error(err); }
      client.query('SELECT * FROM yonim_test', function(err, results) {
        expect(results.rows.length).to.equal(1);
        done();
      })
    })
  });
});

  it("Should generate data and add fields to the database", function(done) {
        client = new pg.Client(db.connectionString);
    client.connect();
    
    request({ method: "POST",
              uri: "http://127.0.0.1:5001/api/generateTable:?usr=yonim",
              json: {"tableName": "test", "Name.firstName": "yes", "Name.lastName": "yes", "Address.streetAddress": "yes"}
    }, function(error, firstResult) {
      var queryString = "SELECT * FROM yonim_test";
      //console.log('first result', firstResult);     
      client.query(queryString, function(err, results) {
        if(err) { throw err;}
        //expect(results.rows.length).to.equal(10);
        //expect(results.rows[0].username).to.equal("erikdbrown@gmail.com");
        console.log('results in generate data', results.rows);

      done();
      });
    });
  });





});


  // it("Should return 403 if a username is already in the database", function(done) {
  //   request({ method: "POST",
  //             uri: "http://127.0.0.1:5001/api/users/",
  //             json: { email: "erikdbrown@gmail.com", first: 'Erik', last: 'Brown', password: 'p@ssw0rd' }
  //   }, function(error, res, body) {
  //       request({ method: "POST",
  //                 uri: "http://127.0.0.1:5001/api/users/",
  //                 json: { email: "erikdbrown@gmail.com", first: 'Erik', last: 'Brown', password: 'p@ssw0rd' }
  //       }, function(error, res, body) {
  //         expect(res.statusCode).to.equal(403);
  //         done();
  //       });
  //   })
  // });

  // it("Should store a hashed password to the database", function(done) {
  //     request({ method: "POST",
  //             uri: "http://127.0.0.1:5001/api/users/",
  //             json: { email: "erikdbrown@gmail.com", first: 'Erik', last: 'Brown', password: 'p@ssw0rd' }
  //   }, function(error, res, body) {
  //     var queryString = "SELECT * FROM users";
  //     var queryArgs = [];

  //     client.query(queryString, queryArgs, function(err, results) {
  //       expect(results.rows[0].password).to.not.equal('p@ssw0rd');
  //       bcrypt.compare('p@ssw0rd', results.rows[0].password, function(err, isMatch) {
  //         expect(isMatch).to.equal(true);

  //         done();
  //       })
  //     });
  //   });
  // });

  // it("Should return 404 from login if user does not exist", function(done) {
  //     request({ method: "POST",
  //             uri: "http://127.0.0.1:5001/api/users/login",
  //             json: { email: "erikdbrown@gmail.com", first: 'Erik', last: 'Brown', password: 'p@ssw0rd' }
  //   }, function(req, res) {
  //     expect(res.statusCode).to.equal(404);
  //     done();
  //   });
  // });

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

