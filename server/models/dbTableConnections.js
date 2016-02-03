var pg = require('pg');
var db = require('../utils/dbconnect.js');

var client = new pg.Client(db.connectionString);
client.connect();

client.query('CREATE TABLE IF NOT EXISTS Tables (' +
	'id SERIAL PRIMARY KEY, ' +
  'userID VARCHAR(120), ' +
  'columns VARCHAR(200), ' +
  'tablename VARCHAR(120) )', function(err, result) {
    if (err) { throw new Error(err); }
    console.log('"Tables" table created');
})