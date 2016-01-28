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
    var fieldArr = [];

    // console.log('fakeData', fakeData);

    // creating a new table with no columns 
    client.query("CREATE TABLE IF NOT EXISTS "+username+"_"+tableName+"();");

    // adding columns to the table 
    for (var key in tableData){
      if( key !== 'tableName'){
        var fields = key.split(".");
               
        client.query("ALTER TABLE "+username+"_"+tableName+" ADD COLUMN "+ fields[1] +" text;");
      }
    }
    //takes all the data, removes the double quotes, adds commas between them, and removes the last comma then
    //pushes it to the correct table 
    for(var i = 0; i < fakeData.length; i++){
      var singled = '';
      for(var y = 0; y < fakeData[i].length; y++){
        singled += " " +"'"+  fakeData[i][y] + "'" + ",";
      }
      var sliced = singled.slice(0, singled.length-1);
      console.log(sliced);
      client.query("INSERT INTO "+username+"_"+tableName+" VALUES ("+sliced+");");
    }

 
//push the table id into the table USERS to the associated username 



	res.status(200).send("success");
    // var results = [];

    // // SQL Query > Insert Data
    // client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);

    // // SQL Query > Select Data
    // var query = client.query("SELECT * FROM items ORDER BY id ASC");

    // // Stream results back one row at a time
    // query.on('row', function(row) {
    //     results.push(row);
    // });

    // // After all data is returned, close connection and return results
    // query.on('end', function() {
    //     done();
    //     return res.json(results);
    // });
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