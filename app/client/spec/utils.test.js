
var pg = require('pg');
var db = require('../../server/utils/dbconnect.js');
var expect = require('../../node_modules/chai/chai').expect;

//create a db connection for each test run


describe('Creating a table', function () {
  var client;
  beforeEach(function(done) {


    console.log('in before each hook')

    client = new pg.Client(db.connectionString);
      
    client.connect();


    var UserTablename = "users";

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    client.query("DROP TABLE " + UserTablename);

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
        done();
    })
    var testq = client.query('SELECT * FROM users', function (err, result){
      console.log(err);
      console.log(result);
      
    });
  });

  it('should be a test', function () {
    console.log('test');




  })






})

