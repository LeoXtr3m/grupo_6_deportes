const User = require('../database/users.json')

function userLoggedMiddleware(req, res, next) {
	//return res.send("holaaaaa")
    res.locals.isLogged = false;/// INDICA QUE SE INICIO SESION
    
	 let emailInCookie = req.cookies.userEmail;   /// Busca si hay un usuario en la cookie con el email (un email guardado)
	//let userFromCookie = User.filter(usuarioLogeado => usuarioLogeado.email == emailInCookie);  /// lo busca en el json de usuarios 
	let userFromCookie = User.find(oneUser => oneUser['email'] === emailInCookie); 
	
	console.log("COOKIES")
	console.log(userFromCookie)

	if(userFromCookie != undefined){      /// si encontro a alguien en la cookie entra con la informacion de esa persona en userFromCookie
	     //	console.log("entree!")
		delete userFromCookie.password;  // borrar el password por seguridad en el loggin
		console.log(userFromCookie)
		req.session.userLogged = userFromCookie;
	} 
	console.log("LOGGED")
	
	console.log(req.session.userLogged) 

	if (req.session && req.session.userLogged) {
		res.locals.isLogged = true;   /// INDICA QUE SE INICIO SESION 	
		res.locals.userLogged = req.session.userLogged;
		//return res.send(res.locals.userLogged)
	} 

	 //if(req.cookies.userEmail != undefined){


	
//	} 


	next();
}

module.exports = userLoggedMiddleware;