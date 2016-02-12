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
		return fetch('/api/users/tables/' + tablename, {
			credentials: 'same-origin'
		})
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
				rowObject.id = value;
				rowObject.name = value.slice(0,4);
			} else {
				var object = {};
				object.name = value;
				rowObject.children.push(object);
			}
		});
		console.log('formatted row: ', rowObject)
		return rowObject;
	}

}

export default helpers;
