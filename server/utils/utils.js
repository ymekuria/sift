module.exports = {

	isAuth: function(req, res, next) {
		if (req.isAuthenticated()) { return next(); }
		res.redirect('/#/signin');
	},

	routeToHome: function(req, res) {
    // req.login();
    res.redirect('/');
  }
}