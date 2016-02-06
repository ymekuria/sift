var r = require('rethinkdb');

var connection = null;
r.connect({ host: 'localhost', db: 'apiTables' }, function(err, conn) {
  if (err) throw err;
  connection = conn;
});

var socketMethods = {

	startIOConnection: function(tablename, callback) {
		// opens up a stream connection to rethinkDB
		r.table(tablename).changes({ includeInitial: true }).run(conn, function(err, cursor) {
			if (err) { throw new Error(err); }
			console.log('changefeed is open.')
			cursor.each(function(node) {
				// socket io needs to emit an 'update' + table message with the item
				io.sockets.emit("update " + tablename, node);
			})
		});
	},

	addNode: function(node) {
		// node = {
		// 	tablename: String,
		// 	username: String,
		// 	values: Array
		// }
		var tablename = node.username + '_' + node.tablename;
		// adds node to database using same external API endpoint
		r.db('apiTables').table(tablename).insert(node.values).run(connection, function(err, response) {
			if (err) { console.log('There was error adding to ' + tablename); }
			console.log('Added node to ' + tablename);
		})
	},


	editNode: function(node) {
		// node = {
		// 	tablename: String,
		// 	username: String,
		//  rowId = Number,
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
		// 	rowId: Number
		// }
		var tablename = node.username + '_' + node.tablename;
		// removes node from database using same external API endpoint
		r.table(tablename).get(node.rowId).delete().run(connection, function(err, results) {
      if (err) { console.log('There was error deleting node from ' + tablename); }
      console.log('Removed node from ' + tablename);
    })
	}

};

module.exports = socketMethods;