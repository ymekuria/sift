var pg = require('pg');
var db = require('../utils/dbconnect.js');

var client = new pg.Client(db.connectionString);
client.connect();

client.query('CREATE TABLE IF NOT EXISTS usersTables (' +
  'username VARCHAR(120), ' +
  'tableName VARCHAR(120) )', function(err, result) {
    if (err) { throw new Error(err); }
    console.log('"usersTables" table created');
})