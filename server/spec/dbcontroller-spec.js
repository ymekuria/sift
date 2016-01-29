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

    var tablename = "yonim_test";

   client.query("DROP TABLE IF EXISTS " + tablename); 

   client.query('CREATE TABLE IF NOT EXISTS yonim_test ('+
    'firstname VARCHAR(120), ' +
    'lastname VARCHAR(120), ' +
    'streetaddress VARCHAR(200))', function(err, result) {
      if (err) { throw new Error(err); }
      console.log('test table created');
      done();
    }); 
  });
 

  afterEach(function() {
    //client.query("DROP TABLE yonim_test");
    client.end();
    });

  it("Should write to the database", function(done) {
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

  it("Should retrieve a schema", function(done) {
    request({ method: "GET",
              uri: "http://127.0.0.1:5001/api/getOneTable:?usrTable=yonim_test"
              
    }, function(err, results) {
      if (err) {throw new Error(err);}
        //expect(results.rows.length).to.equal(1);
        console.log('results in retrieve schema ', results.rows);
      done();
      });    
    });

  it("Should retrieve a list of all of a Users schemas", function(done) {
    request({ method: "GET",
              uri: "http://127.0.0.1:5001/api/getTables:?usr=yonim"
              
    }, function(err, results) {
      if (err) {throw new Error(err);}
        //expect(results.rows.length).to.equal(1);
        //console.log('results in retrieve all schemas ', results.rows);
      done();
      });    
    });

  it("Should delete a usersTable", function(done) {
  request({ method: "GET",
            uri: "http://127.0.0.1:5001/api/deleteTable",
            json: { tableName: "yonim_test" }
            
  }, function(err, results) {
    if (err) {throw new Error(err);}
      
    done();
    });    
  });

  it("Should delete a row from a usersTable", function(done) {
  request({ method: "GET",
            uri: "http://127.0.0.1:5001/api/deleteRow",
            json: { tableName: "yonim_test", columnName: "firstname", "value": "yoni"  }
            
  }, function(err, results) {
    if (err) {throw new Error(err);}
      
    done();
    });    
  });

    it("Should update a value in a usersTable", function(done) {
  request({ method: "GET",
            uri: "http://127.0.0.1:5001/api/updateValue",
            json: { tableName: "yonim_test", columnName: "firstname", "newValue": "john", "oldValue": "yoni" }
            
  }, function(err, results) {
    if (err) {throw new Error(err);}
      
    done();
    });    
  });
 
});  

  // it("Should generate data and add fields to the database", function(done) {
  //       client = new pg.Client(db.connectionString);
  //   client.connect();
    
  //   request({ method: "POST",
  //             uri: "http://127.0.0.1:5001/api/generateTable:?usr=yonim",
  //             json: {"tableName": "test", "Name.firstName": "yes", "Name.lastName": "yes", "Address.streetAddress": "yes"}
  //   }, function(error, firstResult) {
  //     var queryString = "SELECT * FROM yonim_test";
  //     //console.log('first result', firstResult);     
  //     client.query(queryString, function(err, results) {
  //       if(err) { throw err;}
  //       //expect(results.rows.length).to.equal(10);
  //       //expect(results.rows[0].username).to.equal("erikdbrown@gmail.com");
  //       console.log('results in generate data', results.rows);

  //     done();
  //     });
  //   });
  // });







