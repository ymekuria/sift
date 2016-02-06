var r = require('rethinkdb');
var server = require('../server').server;

var connection = null;
r.connect({ host: 'localhost', db: 'apiTables' }, function(err, conn) {
  if (err) throw err;
  connection = conn;
});

module.exports = {

	addNode: function(node) {
		// node = {
		// 	tablename: String,
		// 	username: String,e
		// 	values: Array
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
		// 	node: Object
		// }
		var tablename = node.username + '_' + node.tablename;
		// edits node in database using same external API endpoint
		r.table(tablename).get(node.rowId).update(node.node).run(connection, function(err, results) {
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
		// removes node from database using same external API endpoint
		r.table(tablename).get(node.rowId).delete().run(connection, function(err, results) {
      if (err) { console.log('There was error deleting node from ' + tablename); }
      console.log('Removed node from ' + tablename);
    })
	},

	getTableAndOpenConnection: function(req, res) {
		var io = require('../server').io
		
    var tablename = req.params.tablename;
		var emitmessage = 'update ' + tablename;
    
    r.table(tablename).run(connection, function(err, cursor) {
      if (err) { throw err; }
      cursor.toArray(function(err, results) {
        res.status(200).send(results);
				r.table(tablename).changes({ includeInitial: true }).run(connection, function(err, cursor) {
					if (err) { throw new Error(err); }
					cursor.each(function(err, node) {
						console.log('node: ', node)
						// socket io needs to emit an 'update' + table message with the item
						io.emit(emitmessage, node);
						console.log('Emitting: ', 'update ' + tablename);
					})
				});
      });
    });
	}
};

