var pg = require('pg');

var db = require('../utils/dbconnect.js');
// var client = new pg.Client(db.connectionString);
var client = new pg.Client(db.connectionString);
client.connect();

// var client = require('../utils/dbconnect.js')


module.exports = {

/////////POST///////////

postUserSchema: function(req, res){
  
  var tableData = req.body;
	//get the username by accessing from the header : res.headers
	var username = req.query.usr
  //get the object from req.body, the first value will the title of the table,
  var tableName = tableData.title;

  //the subsequent ones will be the columns
	for ( var keys in tableData ) {
		if( keys !== 'title') {
			//generate a table with everyname of the user
		}
	}
//e.g = {title: "students", name: true, age: true}

//create a table called req.body.title
 
//each values in the object 
//push the table id into the table USERS to the associated username 

	//client.query("CREATE TABLE items(first TEXT);");

	res.status(200).send("success");
    // var results = [];

    // // Grab data from http request
    // var data = {text: req.body.text, complete: false};
    // // Get a Postgres client from the connection pool

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