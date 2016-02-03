var pg = require('pg');
var r = require('rethinkdb');
var faker = require('faker');
var _ = require('lodash');
var psqlDB = require('../utils/dbconnect.js');
var utils = require('../utils/generateData.js');
var tableConnections = require('../models/dbTableConnections.js');

// setting up Postgres connection
var client = new pg.Client(psqlDB.connectionString);
client.connect();

// setting up RethinkDB connection
var connection = null;
r.connect( { host: 'localhost' }, function(err, conn) {
  if (err) throw err;
  connection = conn;
  r.dbCreate('apiTables').run(conn, function(err, conn) {
    console.log('Tables DB created in RethinkDB')
  });
});


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
    var username = 'erikdbrowngmailcom'; // req.user.username
    var userID = 23 //req.user.id;

    var columns = utils.parseColumnNames(req.body)
    var tablename = username + '_' + req.body.tableName;
    var fakeData = utils.generateData(req.body, columns, 20); // returns an array of 20 JSONs [{ firstname: "Erik", lastname: "Brown", catchPhrase: "Verdant Veranda FTW"}, ...];
    
    // creating a new table
    r.db('apiTables').tableCreate(tablename).run(connection, function(err, result) {
      if (err) throw err;
      // add fakeData to the table
      r.db('apiTables').table(tablename).insert(fakeData).run(connection, function(err, response) {
        if (err) { throw err; }
        // add postgres query to save tablename to user list
        columns = columns.join(',');
        client.query('INSERT INTO Tables (userID, tablename, columns) VALUES ($1, $2, $3)', [userID, tablename, columns], function(err, response){
          if (err) { throw err; }
          res.sendStatus(200);
        })
      });
    });
  },

  // this method retrieves all the tableNames associated with the passed in username
  getTables: function(req, res) {

    var userID = 23 // req.user.userID;
    var queryString = "SELECT tablename, columns FROM tables WHERE userID = '" + userID + "';";
    client.query(queryString, function(err, tableNames){
        if (err) { throw new Error(err); }
        _.each(tableNames.rows, function(row) {
          row.columns = row.columns.split(',')
        })
        res.status(200).json(tableNames.rows);
    });
  },

  // this method retrieves all the rows in the table specified from the query param
  getOneTable: function(req, res) {
    var tablename = req.params.username + '_' + req.params.tablename;

    r.table(tablename).run(connection, function(err, cursor) {
      if (err) { throw err; }
      cursor.toArray(function(err, results) {
        cursor.close();
        res.status(200).send(results);
      });
    });
  },

 // this posts to a users tables. The front-end sends a post request with the columns and new values
 // {columnName: value, column2Name: value, ...}
  postToTable: function(req, res) {
    var tablename = req.params.username + '_' + req.params.tablename;

    r.table(tablename).insert(req.body).run(connection, function(err, response) {
      if (err) { throw err; }
      res.sendStatus(200);
    });
  },

  ///////////PUT/////////// updates a row in a column 
  updateValue: function(req, res) {
    var tablename = req.params.username + '_' + req.params.tablename;
    var rowId = req.params.rowId;

    var columnName = req.body.columnName;
    var newValue = req.body.newValue
    var update = {};
    update[columnName] = newValue;

    r.table(tablename).get(rowId).update(update).run(connection, function(err, results) {
      if (err) { throw err; }
      res.sendStatus(200);
    })
  },

  ///////////DELETE//////////
  // deletes a row from a users table. Needs the tablename, and a value and columName that corresponds with the roow to be deleted
  // eg {"tableName": "yoni_test","columnName": "lastname", "value": "lastname"}

  deleteRow: function(req, res) {
    var tablename = req.params.username + '_' + req.params.tablename;
    var rowId = req.params.rowId;

    r.table(tablename).get(rowId).delete().run(connection, function(err, results) {
      if (err) { throw err; }
      res.sendStatus(200);
    })
  },
  
  // deletes a users table. Needs the tableName eg {"tableName": "yoni_test"} 
  // returns the table that was deleted.
  deleteTable: function(req, res) {
    var username = 'erikdbrowngmailcom'; // req.user.username;
    var userID = 23; // req.user.id;
    
    var tablename = username + '_' + req.body.tableName;

    // stores the table to be deleted 
    client.query('DELETE FROM usersTables WHERE userID = ' + userID + ' AND tableName = ' + tablename, function(err, entireTable) {
      if (err) { throw new Error(err); }
      console.log('entireTable', entireTable)
      var deletedTable = entireTable.rows;

      r.db('apiTables').dropTable(tablename).run(connection, function(err, results) {
        if (err) { throw err; }
        res.sendStatus(200);
      });

      // this query deletes the table
      // client.query('DROP TABLE IF EXISTS ' + usernameTable, function(err, result) {
      //   if (err) { throw new Error(err); }
      //   console.log('succesfuly deleted '+usernameTable+ '  table');
      //   res.status(200).json('succesfuly deleted '+usernameTable+ '  table', deletedTable);
      // });
    });
 
  }

};
