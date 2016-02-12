var pg = require('pg');
var db = require('../utils/dbconnect.js');

var client = new pg.Client(db.connectionString);
client.connect();

client.query('CREATE TABLE IF NOT EXISTS Tables (' +
	'id SERIAL PRIMARY KEY, ' +
  'userID INTEGER, ' +
  'columns VARCHAR(200), ' +
  'custom boolean(60'
  'tablename VARCHAR(120) )', function(err, result) {
    if (err) { console.log(err); }
    console.log('"Tables" table created');
})