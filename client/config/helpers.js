let helpers = {

	setUser: function(callback) {
		fetch('/user', {
			credentials: 'same-origin'
		})
		.then((response) => {
			return response.text()
		})
		.then((responseText) => {
			callback(responseText);
		})
		.catch((err) => {
			console.log(err)
		})
	},

	startIOConnection: function(tablename) {

		// listens to 'update' + tablename
			// when updated, re-render view
	},

	editNode: function(node, tablename) {
		// emits to 'edit ' + tablename
	},

	addNode: function(node, tablename) {
		// emits to 'add ' + tablename

	},

	removeNode: function(node, tablename) {
		// emits to 'remove ' + tablename

	}

}

export default helpers;