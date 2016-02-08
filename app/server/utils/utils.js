
var jwt = require('jwt-simple');

module.exports = {

	isAuth: function(req, res, next) {
		if (req.isAuthenticated()) { 
			console.log('Authenticated!')
			return next(); 
		}
		console.log('NOT Authenticated')
		res.redirect('/signin');
	},

	generateToken: function(user, callback) {
		callback(token);
	},

  decode: function(req, res) {
  	var token = req.body.token
  	if (!token) {
  		token = generateToken(req.user, 'greenVeranda')
  		res.send(token);
  	} else {
	  	user = jwt.decode(token, 'greenVeranda')
	  	req.user = {
	  		displayName: user.displayName
	  	};
  	}
  }
}

