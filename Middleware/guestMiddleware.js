function guestMiddleware(req, res, next) {
	//return res.send(req.session)
	if (req.session.userLogged) {
		res.locals.islogged = true;   /// INDICA QUE SE INICIO SESION 
		let categorias = req.session.userLogged;
		return res.redirect('../views/products/index.ejs', {categorias:categorias});
	}
	next();
}

module.exports = guestMiddleware;