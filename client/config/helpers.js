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
		console.log('calling /user')
		return fetch('/user', {
			credentials: 'same-origin'
		})
		.then((res) => {
			console.log('this is the response: ', res.body)
			callback(res);
		})
	}

}

export default helpers;