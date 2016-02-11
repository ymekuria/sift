var client = require('../utils/dbconnect').client;
var r = require('rethinkdb');
var socketController = require('./socketController')
var faker = require('faker');
var _ = require('lodash');
var utils = require('../utils/utils.js');
var config = require('../server.js');
var connection = null;
var rConnectConfig;

if (process.env.RETHINK_PORT_8080_TCP_ADDR) {
  rConnectConfig = { host: 'rethink', db: 'apiTables' }
} else {
  rConnectConfig =  { host: 'localhost', db: 'apiTables' }
}

r.connect(rConnectConfig, function(err, conn) {

  if (err) throw err;
  connection = conn;
  r.dbCreate('apiTables').run(conn, function(err, conn) {
    console.log('Tables DB created in RethinkDB')
  });
});

dbMethods = {

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
    //retrieve user from session store
    console.log('req.body in createUserTable',req.body);
    var userID = req.user.id;
    var columns = req.body.columns || utils.parseColumnNames(req.body); // custom request have a columns property.
    var tablename = req.user.username + '_' + req.body.tablename;
    var custom = req.body.custom || false;
    var columnsString, fakeData;

    // check postgres first to see if tablename exists
    var queryString = 'SELECT tablename FROM tables WHERE userid = ($1) AND tablename = ($2)';
    client.query(queryString, [userID, tablename], function(err, response) {
      if (response.rows.length > 0) {
        res.status(400).send({ message: 'Table already exists' }) // table already exists

      } else {
        r.db('apiTables').tableCreate(tablename).run(connection, function(err, result) {
          // handle custom table
          if (custom) {
            columnsString = Object.keys(columns).join(','); // firstname,lastname,company
            dataTypesString = _.map(columns, function(value) { // boolean,string,object,array
              return value;
            }).join(',')
            dbMethods.addCustomTableToPostgresTables(userID, tablename, columnsString, dataTypesString, custom, function(err) {
              if (err) { utils.handleError(err); }
              res.sendStatus(200);
            })
          // create table and add generated data
          } else {
            fakeData = utils.generateData(req.body, columns, 20, function(data) {
              columnsString = columns.join(',');
              dbMethods.addFakeDataTableToPostgresTables(userID, tablename, columnsString, custom, function(err) {
                if (err) { utils.handleError(err); }
                dbMethods.addFakeData(tablename, data, function(err) { // returns an array of 20 JSONs [{ firstname: "Erik", lastname: "Brown", catchPhrase: "Verdant Veranda FTW"}, ...];
                  if (err) { utils.handleError(err); }
                  res.sendStatus(200);
                })
              });
            });
          }
        });
      }
    })
  },

  addFakeDataTableToPostgresTables: function(userID, tablename, columns, custom, cb) {
    var queryString = 'INSERT INTO Tables (userID, tablename, columns, custom) VALUES ($1, $2, $3, $4)';
    client.query(queryString, [userID, tablename, columns, custom], function(err, response){
      cb(err);
    })
  },

  addCustomTableToPostgresTables: function(userID, tablename, columns, datatypes, custom, cb) {
    var queryString = 'INSERT INTO Tables (userID, tablename, columns, datatypes, custom) VALUES ($1, $2, $3, $4, $5)';
    client.query(queryString, [userID, tablename, columns, datatypes, custom], function(err, response){
      cb(err);
    })
  },

  addFakeData: function(tablename, fakeData, cb) {
    r.db('apiTables').table(tablename).insert(fakeData).run(connection, function(err, response) {
      cb(err);
    });
  },

  // this method retrieves all the tableNames associated with the passed in username
  getTables: function(req, res) {
    var userID = req.user.id;
    var queryString = 'SELECT id, tablename, columns FROM tables WHERE userID = ' + userID;
    
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
        res.status(200).send(results);
      });
    });
  },

 // this posts to a users tables. The front-end sends a post request with the columns and new values
 // {columnName: value, column2Name: value, ...}
  postToTable: function(req, res) {
    var tablename = req.params.username + '_' + req.params.tablename;
    var columns;

    var queryString = 'SELECT custom, datatypes, columns FROM tables WHERE tablename = ($1)';
    client.query(queryString, [tablename], function(err, results) {

      if (results.rows[0].custom) {
        
        var dbColumns = results.rows[0].columns;
        var dbDataTypes = results.rows[0].datatypes;

        dbMethods.matchDataTypes(req.body, dbColumns, dbDataTypes, function(err, passes) {
          if (passes) {

            r.table(tablename).insert(req.body).run(connection, function(err, response) {
              if (err) { throw err; }
              res.sendStatus(200);
            });

          } else {

            var errorMessage = 'Incorrect data type for ' + err.column + '. Expected: ' + err.expected + '. Received: ' + err.received;
            res.status(400).send(errorMessage);

          }

        });

      } else {

        r.table(tablename).insert(req.body).run(connection, function(err, response) {
          if (err) { throw err; }
          res.sendStatus(200);
        });

      }
    })

  },

  matchDataTypes: function(reqColumns, columns, datatypes, callback) {
    columns = columns.split(',');
    datatypes = datatypes.split(',')
    var columns_types = {};

    _.each(columns, function(column, index) {
      columns_types[column] = datatypes[index];
    });

    for (var key in reqColumns) {
      var expected = columns_types[key];
      var actual = reqColumns[key];

      if (expected === 'array' && Array.isArray(actual)) {
        continue
      } else if (expected === 'null' && actual === null) {
        continue
      }
      else if (columns_types[key] !== typeof reqColumns[key]) { // does not capture Arrays and null
        var err = {
          column: key,
          expected: columns_types[key],
          received: typeof reqColumns[key]
        };
        return callback(err, false);
      }
    }
    callback(null, true);
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
    // hardcoded for testing
    var username = req.user.username;
    var userId = req.user.id;
    var tableId = req.params.id;

    client.query('SELECT tablename FROM Tables WHERE id = ' + tableId, function(err, results) {
      if (err) { throw err; }
      if (results.rows.length === 0) {
        res.sendStatus(404);
      }
      tablename = results.rows[0].tablename;
      client.query('DELETE FROM Tables WHERE userID = ' + userId + ' AND id = ' + tableId, function(err, entireTable) {
        if (err) { throw new Error(err); }
        //console.log('entireTable', entireTable)
        var deletedTable = entireTable.rows;

        r.db('apiTables').tableDrop(tablename).run(connection, function(err, results) {
          if (err) { throw err; }
          res.sendStatus(200);
        });
      });
    });
  }
};

module.exports = dbMethods;
