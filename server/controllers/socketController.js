var r = require('rethinkdb');

var connection = null;
r.connect({ host: 'localhost', db: 'apiTables' }, function(err, conn) {
  if (err) throw err;
  connection = conn;
});

var socketMethods = {

	startIOConnection: function(tablename) {
		// opens up a stream connection to rethinkDB
		r.table(tablename).changes().run(conn, function(err, cursor) {
			if (err) { throw new Error(err) }
			cursor.each(function(item) {
				// socket io needs to emit an 'update' + table message with the item
				io.sockets.emit("update " + tablename, item);
			})
		});

		// opens up a custom listener for a table
			// listens to 'edit ' + tablename
			  // calls editNode (below)
			// listens to 'add ' + tablename
			  // calls addNode (below)
			// listens to 'remove ' + tablename
			  // calls removeNode(below)
	},

	addNode: function(node) {
		// node = {
		// 	tablename: String,
		// 	username: String,
		// 	values: Array
		// }

		
		// adds node to database using same external API endpoint
	},


	editNode: function(node) {
		// node = {
		// 	tablename: String,
		// 	username: String,
		//  rowId = Number,
		// 	updatedColumns: Array,
		// 	updatedValues: Array
		// }

		// edits node in database using same external API endpoint
	},

	removeNode: function(node) {
		// node = {
		// 	tablename: String,
		// 	username: String,
		// 	rowId: Number
		// }

		// removes node from database using same external API endpoint
	}

};

module.exports = socketMethods;