var pg = require('pg');
var faker = require('faker');
var _ = require('lodash');
var db = require('../utils/dbconnect.js');
var utils = require('../utils/generateData.js');
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

//dataIndex = all of our data
{ tableName: 'yoniTable',
  name: { 
    firstName: true, 
    lastName: true}, 
  company: {
    catchPhrase: true}
}

*/

  // this method creates a new table with generated data 
  postUserTable: function(req, res) {
    var username = 'erikdbrowngmailcom'; // TODO: figure out how to remove special characters from email address

    var tableName = req.body.tableName;
    var fakeData = utils.generateData(req.body, 20); // returns an ordered array ['Erik', 'Brown', 'Yahoo!', 'Zack', 'Dean', 'Google'...];
    var columnsArray = utils.parseColumnNames(req.body);
    var columnCreation = columnsArray.join(" text, ") + ' text';
    var columnInsertion = columnsArray.join(', ');

    
    // creating a new table with no columns 
    var queryString = "CREATE TABLE IF NOT EXISTS " + username + "_" + tableName + " (" + columnCreation + ");";
    client.query(queryString, function(err, rows) {
      if (err) { throw new Error(err); }
    });
     
    var valueStr = utils.generateValueString(columnsArray.length);

    var insertString = "INSERT INTO " + username + "_" + tableName + " (" + columnInsertion + ") VALUES " + fakeData + ";";

    client.query(insertString, function(err, rows) {
      if (err) { throw new Error(err); }
    });
      
    client.query('INSERT INTO userstables (username, tablename) VALUES ($1, $2)', [username, username + "_" + tableName], function(err,rows) {
      if (err) { throw new Error(err); }
      res.sendStatus(200);
    });
  },


  // this method retrieves all the tableNames associated with the passed in username
  getTables: function(req, res){

    var username = req.query.usr;
    var queryString = "SELECT tablename FROM userstables WHERE username = '" + username + "';";
    client.query(queryString, function(err,tableNames){
        if (err) { throw new Error(err); }
        res.status(200).json(tableNames.rows);
    });
  },

  // this method retrieves all the rows in the table specified from the query param
  getOneTable: function(req, res) {
    var table = req.params.username + '_' + req.params.tablename;

    var queryString = "SELECT * FROM " + table + ";";
    client.query(queryString, function(err, dbTable){
        if (err) { throw new Error(err); }
        if (!dbTable) {
          res.sendStatus(404); // Table does not exist;
        }
        res.status(200).json(dbTable.rows);
    });

  },

 // this posts to a users tables. The front-end sends a post request with the columns and new values
 // {columnName: value, column2Name: value, ...}
  postToTable: function(req, res) {
    var table = req.params.username + '_' + req.params.tablename;

    var newRowColumnsArray = Object.keys(req.body);
    var newRowValuesArray = _.map(newRowColumnsArray, function(key) {
      return req.body[key];
    });
    newRowColumnsString = newRowColumnsArray.join(',');

    // stringify to put in query string.
    var valueStr = utils.generateValueString(newRowColumnsArray.length);

    var queryString = "INSERT INTO " + table + "(" + newRowColumnsString + ") VALUES (" + valueStr + ")"
    client.query(queryString, newRowValuesArray, function(err, rows) {
      if (err) { throw new Error(err); }
      console.log('succesfuly posted to ' + table + '  table');
      res.status(200).send('succesfuly posted to ' + table + '  table')
    });

  },

  ///////////PUT/////////// updates a row in a column 
  updateValue: function(req, res){
      var usernameTable = req.body.tableName;
      var columnName = req.body.columnName;
      var newValue = req.body.newValue; 
      var oldValue = req.body.oldValue; 
  // console.log("tableName", usernameTable, "newValue",newValue,"oldValue", oldValue);
  // client.query("UPDATE "+usernameTable+" SET firstname = '"+newValue+"' WHERE firstname = '"+oldValue+"'"
      client.query("UPDATE "+usernameTable+" SET "+columnName+" = '"+newValue+"' WHERE "+columnName+ " = '"+oldValue+"'", function(err, data) { 
       if (err) { throw new Error(err); }
         res.status(200).send('succesfully modified '+ oldValue + " to " + newValue + " in " + usernameTable);
      });
  },

  ///////////DELETE//////////
  // deletes a row from a users table. Needs the tablename, and a value and columName that corresponds with the roow to be deleted
  // eg {"tableName": "yoni_test","columnName": "lastname", "value": "lastname"}

  deleteRow: function(req, res){
      var usernameTable = req.body.tableName;
      var columnName = req.body.columnName;
      var value = req.body.value; 
      
      var queryString = "DELETE FROM "+usernameTable+" WHERE "+columnName+ " = '"+ value+"';";
      client.query(queryString, function(err, data) { 
       if (err) { throw new Error(err); }
         console.log('succesfully deleted the row that has '+ value+' as a '+columnName)
         res.status(200).send('succesfully deleted the row that has '+ value+' as a '+columnName);
      });

  },
  
  // deletes a users table. Needs the tableName eg {"tableName": "yoni_test"} 
  // returns the table that was deleted.
  deleteTable: function(req, res){
    var usernameTable = req.body.tableName;

    // stores the table to be deleted 
    client.query('SELECT * FROM '+usernameTable, function(err, entireTable){
      if (err) { throw new Error(err); }
      var deletedTable = entireTable.rows;

      // this query deletes the table
      client.query('DROP TABLE IF EXISTS ' + usernameTable, function(err, result) {
        if (err) { throw new Error(err); }
        console.log('succesfuly deleted '+usernameTable+ '  table');
        res.status(200).json('succesfuly deleted '+usernameTable+ '  table', deletedTable);
      });
    });
 
  }

};
