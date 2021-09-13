function guestMiddleware(req, res, next) {
	//return res.send(req.session)
	if (req.session.userLogged == undefined) {
		//return res.send("estoy dentro");
		//res.locals.islogged = true;   /// INDICA QUE SE INICIO SESION 
		//let categorias = req.session.userLogged;
		//res.redirect('/login', {categorias:categorias});
		return res.redirect('/login');
	}
	next();
}

module.exports = guestMiddleware;