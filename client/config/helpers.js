let helpers = {

	// handleToken(token, callback) {
	// 	return fetch('/user', {
	// 		method: 'POST',
	// 		body: JSON.stringify({
	// 			token: token
	// 		})
	// 	})
	// 	.then((res) => {
	// 		callback(res.user);
	// 	}) 
	// },

	setUser: function(callback) {
		fetch('/user', {
			credentials: 'same-origin'
		})
		.then((response) => response.text())
		.then((responseText) => {
			callback(responseText);
		})
		.catch((err) => {
			console.log(err)
		})
	}

}

export default helpers;