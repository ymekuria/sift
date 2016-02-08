let helpers = {

	setUser: function(callback) {
		fetch('/user', {
			credentials: 'same-origin'
		})
		.then((response) => {
			return response.json()
		})
		.then((responseText) => {
			callback(responseText);
		})
		.catch((err) => {
			console.log(err)
		})
	},

	loadTable: function(tablename, callback) {
		// listens to 'update' + tablename
		return fetch('/api/users/tables/' + tablename)
		.then((res) => {
			return res.json()
		})
		.then((json) => {
			callback(json);
		})
		// when updated, re-render view
	},

	formatData(node) {
		var rowObject = {
			children: []
		};
		_.each(node, function(value, key) {
			if (key === 'id') {
				rowObject.name = value;
			} else {
				var object = {};
				object[key] = value;
				rowObject.children.push(object);
			}
		});
		return rowObject;
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