function guestMiddleware(req, res, next) {
	//return res.send(req.session)
	if (req.session.userLogged) {
		return res.redirect('../views/products/index.ejs');
	}
	next();
}

module.exports = guestMiddleware;