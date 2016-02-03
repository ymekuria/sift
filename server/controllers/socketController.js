var pg = require('pg');
var app = require('../server.js')
var db = require('../utils/dbconnect.js');

var client = new pg.Client(db.connectionString);
client.connect();

module.exports = {

	addNode: function(node, callback) {
		// node = {
		// 	tablename: String,
		// 	username: String,
		// 	values: Array
		// }
		var table = node.username + '_' + node.tablename;
		var values = node.values.join(', ');
		var queryString = 'INSERT INTO ' + table + 'VALUES (' + values + ');'; 
		db.query(queryString, function(err, res) {
			callback(res);
		})

	},


	editNode: function(node, callback) {
		// node = {
		// 	tablename: String,
		// 	username: String,
		//  rowId = Number,
		// 	updatedColumns: Array,
		// 	updatedValues: Array
		// }
		var table = node.username + '_' + node.tablename;
		var columns = node.updatedColumns.join(',');
		var values = node.updatedValues.join(',');
		var queryString = 'UPDATE ' + table + ' SET (' + columns + ') = (' + values + ') WHERE id = ' + node.rowId;
		db.query(queryString, function(err, data) {
			console.log(data);
		});
	},

	removeNode: function(node, callback) {
		// node = {
		// 	tablename: String,
		// 	username: String,
		// 	rowId: Number
		// }
		var queryString = 'DELETE FROM ' + node.username + '_' + node.tablename + ' WHERE id = ' + node.rowId;
		db.query(queryString, function(err, data) {
			console.log(data);
		})
	}

}