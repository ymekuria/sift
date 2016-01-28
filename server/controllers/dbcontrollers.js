var pg = require('pg');
var faker = require('faker');

var db = require('../utils/dbconnect.js');
var gen = require('../utils/generateData.js');

var client = new pg.Client(db.connectionString);
client.connect();


module.exports = {

/////////POST///////////

///SAMPLE QUERY///
/*
{"tableName": "mytable",
    "Name.firstName": "yes",
    "Name.lastName": "yes",
    "Address.streetAddress": "yes"
}
*/

postUserSchema: function(req, res){

    var tableData = req.body;
    var username = req.query.usr;
    var tableName = tableData.tableName;
    var fakeData = gen.generateData(req, res);
    //var fieldArr = '';
    var fieldArr = [];
    
    // creating a new table with no columns 
    client.query("CREATE TABLE IF NOT EXISTS "+username+"_"+tableName+"();");

    // adding columns to the table 
    for (var key in tableData){
      if( key !== 'tableName'){
        var fields = key.split(".");  
        //fieldArr+=fields[1]+","; 
        fieldArr.push(fields[1]); 
        //var slicedfieldArr = fieldArr.slice(0,fieldArr.length-1);   
        client.query("ALTER TABLE "+username+"_"+tableName+" ADD COLUMN "+ fields[1] +" text;");
      }
    }
     
    var fieldStr = fieldArr.join(",");
    var valueStr = gen.generateValueString(fakeData[0]);

    for(var i = 0; i < fakeData.length; i++) {
      client.query("INSERT INTO "+username+"_"+tableName+"("+fieldStr+") VALUES ("+valueStr+")", fakeData[i], function(err, rows) {
        if (err) { throw new Error(err); }
      });
  
    }

	res.status(200).send("success");

},

///////////GET///////////

//router.get('/api/v1/todos', function(req, res) {
get: function(req, res){

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(db.connectionString
        , function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

},

///////////PUT///////////

//router.put('/api/v1/todos/:todo_id', function(req, res) {
put: function(req, res){
    var results = [];

    // Grab data from the URL parameters
    var id = req.params.todo_id;

    // Grab data from http request
    var data = {text: req.body.text, complete: req.body.complete};

    // Get a Postgres client from the connection pool
    pg.connect(db.connectionString
        , function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE items SET text=($1), complete=($2) WHERE id=($3)", [data.text, data.complete, id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

},

///////////DELETE//////////

// router.delete('/api/v1/todos/:todo_id', function(req, res) {
delete: function(req, res){
    var results = [];

    // Grab data from the URL parameters
    var id = req.params.todo_id;


    // Get a Postgres client from the connection pool
    pg.connect(db.connectionString
        , function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM items WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

},

};