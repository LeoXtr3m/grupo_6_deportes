function userLoggedMiddleware(req, res, next) {
	//return res.send("holaaaaa")
    res.locals.isLogged = false;/// INDICA QUE SE INICIO SESION
    
	if (req.session && req.session.userLogged) {
		res.locals.isLogged = true;   /// INDICA QUE SE INICIO SESION 	
		res.locals.userLogged = req.session.userLogged;
		//return res.send(res.locals.userLogged)
	}
	next();
}

module.exports = userLoggedMiddleware;