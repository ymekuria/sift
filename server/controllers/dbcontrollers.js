var pg = require('pg');
var faker = require('faker');

var db = require('../utils/dbconnect.js');
var gen = require('../utils/generateData.js');
var tableConnections = require('../models/dbTableConnections.js');


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

    client.query('INSERT INTO userstables (username, tablename) VALUES ($1, $2)',[username, username+"_"+tableName]);


	res.status(200).send("success");

},

///////////GET///////////

getTables: function(req, res){
    var username = req.query.usr;
    console.log("username : ",username);
    client.query("SELECT tablename FROM userstables WHERE username = '"+username+"';", function(err,tableNames){
        if (err) { throw new Error(err); }
        console.log(tableNames.rows);
        res.status(200).json(tableNames.rows);
    });
},

getOneTable: function(req, res){
    var usernameTable = req.query.usrTable;


},



///////////PUT///////////
put: function(req, res){
    var results = [];
        // SQL Query > Update Data
        client.query("UPDATE items SET text=($1), complete=($2) WHERE id=($3)", [data.text, data.complete, id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");


},

///////////DELETE//////////
delete: function(req, res){
    var results = [];
        // SQL Query > Delete Data
        client.query("DELETE FROM items WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");


},

};