
var r = require('rethinkdb');
var server = require('../server').server;
var _ = require('lodash');
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
});

var socketMethods = {

	addNode: function(node) {
		// node = {
		// 	tablename: String,
		// 	username: String,
		// 	values: Object
		// }
		var tablename = node.username + '_' + node.tablename;
		r.db('apiTables').table(tablename).insert(node.values).run(connection, function(err, response) {
			if (err) { console.log('There was error adding to ' + tablename); }
			console.log('Added node to ' + tablename);
		})
	},

	editNode: function(node) {
		// node = {
		// 	tablename: String,
		// 	username: String,
		//  rowId = String,
		// 	values: Object
		// }
		var tablename = node.username + '_' + node.tablename;
		r.table(tablename).get(node.rowId).update(node.values).run(connection, function(err, results) {
      if (err) { console.log('There was error updating to ' + tablename); }
      console.log('Edited node on ' + tablename);
    })
	},

	removeNode: function(node) {
		// node = {
		// 	tablename: String,
		// 	username: String,
		// 	rowId: String
		// }
		var tablename = node.username + '_' + node.tablename;
		r.table(tablename).get(node.rowId).delete().run(connection, function(err, results) {
      if (err) { console.log('There was error deleting node from ' + tablename); }
      console.log('Removed node from ' + tablename);
    })
	},

	getTableAndOpenConnection: function(req, res) {
		var io = require('../server').io
    var tablename = req.params.tablename;
		var emitmessage = 'update ' + tablename;

		var data = {
			name: tablename,
			children: []
		};
    
    r.table(tablename).run(connection, function(err, cursor) {
      if (err) { throw err; }
      cursor.toArray(function(err, results) {
      	_.each(results, function(row) {
      		var rowObject = {
      			children: []
      		};
      		_.each(row, function(value, key) {
      			if (key === 'id') {
      				rowObject.name = value;
      			} else {
      				var object = {};
      				object[key] = value;
      				rowObject.children.push(object);
      			}
      		})
      		data.children.push(rowObject);
      	})

				r.table(tablename).changes().run(connection, function(err, cursor) {
					if (err) { throw new Error(err); }
					cursor.each(function(err, node) {
						io.emit(emitmessage, node);
					})
				});
				
				res.status(200).send(data);
      });
    });
	}
};
