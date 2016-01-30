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

         data = {
      firstname: 'Yoni',
      lastname: 'Mekuria',
      streetaddress: '5234 Callback Way'
    }

   client.query("DROP TABLE IF EXISTS " + tablename); 

   client.query('CREATE TABLE IF NOT EXISTS yonim_test ('+
    'firstname VARCHAR(120), ' +
    'lastname VARCHAR(120), ' +
    'streetaddress VARCHAR(200))', function(err, result) {
      if (err) { throw new Error(err); }
    }); 

  
    client.query('INSERT INTO yonim_test (firstname, lastname, streetaddress) VALUES ($1, $2, $3)', [data.firstname, data.lastname, data.streetaddress], function(err, results) {
      if (err) { throw new Error(err); }
      client.query('SELECT * FROM yonim_test', function(err, results) {
        // console.log('results.rows before each', results.rows);
        done();
      });
    });


  });
 

  afterEach(function() {
    client.query("DROP TABLE yonim_test");
    // client.query("DELETE from userstables where username = 'yonim';");
    client.end();
    });


  it("Should retrieve a schema", function(done) {
    request({ method: "GET",
              uri: "http://127.0.0.1:5001/api/getOneTable:?usrTable=yonim_test"
              
    }, function(err, results) {
      if (err) {throw new Error(err);}
        var rows = JSON.parse(results.body)
        expect(rows.length).to.equal(1);
        expect(rows[0].firstname).to.equal("Yoni");
        // console.log('results in retrieve schema ', rows);
      done();
      });    
    });

  it("Should retrieve a list of all of a Users schemas", function(done) {
    
    client.query('INSERT INTO userstables (username, tablename) VALUES ($1, $2)', ['yonim','yonim_test'], function(err, results) {
     if (err) { throw new Error(err); }
    });


    request({ method: "GET",
              uri: "http://127.0.0.1:5001/api/getTables:?usr=yonim"
              
    }, function(err, results) {
      if (err) {throw new Error(err);}
        var rows = JSON.parse(results.body);
        // expect(rows.length).to.equal(1);
        expect(rows[0].tablename).to.equal('yonim_test');
        // console.log('results in retrieve schema ', rows);
      done();
      });    
    });

  it("Should delete a usersTable", function(done) {
  request({ method: "DELETE",
            uri: "http://127.0.0.1:5001/api/deleteTable",
            json: { tableName: "yonim_test" }
  }, function(err, results) {
    if (err) {throw new Error(err);}
      client.query('CREATE TABLE IF NOT EXISTS yonim_test ('+
    'firstname VARCHAR(120), ' +
    'lastname VARCHAR(120), ' +
    'streetaddress VARCHAR(200))', function(err, result) {
      if (err) { throw new Error(err); }
    }); 
      expect(results.body).to.equal("yonim_test");
    });  
    done();

  });

  it("Should delete a row from a usersTable", function(done) {
  request({ method: "DELETE",
            uri: "http://127.0.0.1:5001/api/deleteRow",
            json: { tableName: "yonim_test", columnName: "firstname", value: "Yoni"  }
  }, function(err, results) {
    if (err) {throw new Error(err);}
      expect(results.body).to.equal("succesfully deleted Yoni");
    done();
    });    
  });

  it("Should update a value in a usersTable", function(done) {
  request({ method: "PUT",
            uri: "http://127.0.0.1:5001/api/updateValue",
            json: { "tableName": "yonim_test", "columnName": "firstname", "newValue": "john", "oldValue": "Yoni" }
         }, function(err, results, body) {
          if (err) {console.log(err);}
          expect(results.body).to.equal("succesfully modified Yoni to john in yonim_test");
          done();
        });

  });

});  
////////////////////////////////////////////////////////////////////////////////////////
//////////////////GENERATING DYNAMIC TABLES BELOW //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
describe("Generating dynamic tables", function() {
  var client;

  beforeEach(function(done) {
    client = new pg.Client(db.connectionString);
    client.connect();

///POST REQUEST HERE 
      done();

  });
 

  afterEach(function() {
    client.end();
    });


  it("Should generate data and add fields to the database", function(done) {
    request({ method: "POST",
              uri: "http://127.0.0.1:5001/api/generateTable:?usr=yonim",
              json: {"tableName": "test", "Name.firstName": "yes", "Name.lastName": "yes", "Address.streetAddress": "yes"}
    }, function(error, firstResult) {
      client.query("SELECT * FROM yonim_test", function(err, results) {
        if(err) { throw err;}
        expect(results.rows.length).to.equal(10);
        // console.log('results in generate data', results.rows.length);
        client.query("DROP TABLE IF EXISTS yonim_test;",function(err, data){
          if (err){console.log(err)}
        })
      done();
      });
    });
  });


});
