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
  createUserTable: function(req, res) {
    var username = req.user.username;

    var tableName = req.body.tableName;
    var fakeData = utils.generateData(req.body, 20); // returns an ordered array ['Erik', 'Brown', 'Yahoo!', 'Zack', 'Dean', 'Google'...];
    var columnsArray = utils.parseColumnNames(req.body);
    var columnCreation = columnsArray.join(" text, ") + ' text';
    var columnInsertion = columnsArray.join(', ');

    
    // creating a new table with no columns 
    var queryString = "CREATE TABLE IF NOT EXISTS " + username + "_" + tableName + " ( id SERIAL PRIMARY KEY, " + columnCreation + ");";
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
  getTables: function(req, res) {

    var username = req.user.username;
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
    client.query(queryString, function(err, dbTable) {
      if (!err) {
        res.status(200).json(dbTable.rows);
      } else if (err.code === '42P01') { // sends an error if there is a problem with the parameters (i.e., incorrect username or tablename path)
        res.sendStatus(400);
      } else {
        throw new Error(err);
      }
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
      if (!err) {
        res.sendStatus(200);
      } else if (err.code === '42P01') { // sends an error if there is a problem with the parameters (i.e., incorrect username or tablename path)
        res.sendStatus(400);
      } else {
        throw new Error(err);
      }
    });

  },

  ///////////PUT/////////// updates a row in a column 
  updateValue: function(req, res) {
    var table = req.params.username + '_' + req.params.tablename;
    var rowId = req.params.rowId;

    var columnName = req.body.columnName;
    var newValue = req.body.newValue;
  // console.log("tableName", usernameTable, "newValue",newValue,"oldValue", oldValue);
    client.query("UPDATE " + table + " SET " + columnName + " = '" + newValue + "' WHERE id = " + rowId, function(err, data) { 
     if (!err) {
        res.sendStatus(200);
      } else if (err.code === '42P01') { // sends an error if there is a problem with the parameters (i.e., incorrect username or tablename path)
        res.sendStatus(400);
      } else {
        throw new Error(err);
      }
    });
  },

  ///////////DELETE//////////
  // deletes a row from a users table. Needs the tablename, and a value and columName that corresponds with the roow to be deleted
  // eg {"tableName": "yoni_test","columnName": "lastname", "value": "lastname"}

  deleteRow: function(req, res) {
    var table = req.params.username + '_' + req.params.tablename;
    var rowId = req.params.rowId;
    
    var queryString = "DELETE FROM " + table + " WHERE id = " + rowId;
    client.query(queryString, function(err, data) { 
     if (!err) {
        res.sendStatus(200);
      } else if (err.code === '42P01') { // sends an error if there is a problem with the parameters (i.e., incorrect username or tablename path)
        res.sendStatus(400);
      } else {
        throw new Error(err);
      }
    });
  },
  
  // deletes a users table. Needs the tableName eg {"tableName": "yoni_test"} 
  // returns the table that was deleted.
  deleteTable: function(req, res) {
    var usernameTable = req.body.tableName;

    // stores the table to be deleted 
    client.query('SELECT * FROM '+ usernameTable, function(err, entireTable){
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
