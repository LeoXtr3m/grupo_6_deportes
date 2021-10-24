const User = require('../database/users.json')
const fs = require('fs');
const path = require('path');
let db = require("../database/models")

function userLoggedMiddleware(req, res, next) {
	//return res.send("holaaaaa")
    res.locals.isLogged = false;/// INDICA QUE SE INICIO SESION
    
	 let emailInCookie = req.cookies.userEmail;   /// Busca si hay un usuario en la cookie con el email (un email guardado)
	 console.log("Correo electronico en cookie")
	 console.log(emailInCookie)
	//let userFromCookie = User.filter(usuarioLogeado => usuarioLogeado.email == emailInCookie);  /// lo busca en el json de usuarios 
	//let userFromCookie = User.find(oneUser => oneUser['email'] === emailInCookie); 
 
	if((emailInCookie != undefined)&(res.locals.userLogged==undefined)){
	db.Usuarios.findOne({     // Busca en todas las categorias el valor dado en where 
		where:{
			email: emailInCookie    // busca de las categorias, los que coincidan con el nombre dado 
		}
	})
		.then(function(loggerUser){
			console.log("COOKIES")
			console.log(loggerUser)
		
			if(loggerUser != undefined){      /// si encontro a alguien en la cookie entra con la informacion de esa persona en userFromCookie
				 //	console.log("entree!")
				delete loggerUser.password;  // borrar el password por seguridad en el loggin
				console.log(loggerUser)
				req.session.userLogged = loggerUser;
				console.log("ENTRE AL IF 1 ")
			} 
			console.log("LOGGED")
			
			console.log(req.session.userLogged) 
		
			if (req.session && req.session.userLogged) {
				res.locals.isLogged = true;   /// INDICA QUE SE INICIO SESION 	
				res.locals.userLogged = req.session.userLogged;
				console.log("ENTRE AL IF 2 ")
				console.log(res.locals.userLogged)
				console.log("saliendo del if")
				//return res.send(res.locals.userLogged)
			} 
		
			 //if(req.cookies.userEmail != undefined){
		
		
			
		//	} 
		
		
			next();

		})

	}
	else{
	console.log("LOGGED")
			
	console.log(req.session.userLogged) 

	if (req.session && req.session.userLogged) {
		res.locals.isLogged = true;   /// INDICA QUE SE INICIO SESION 	
		res.locals.userLogged = req.session.userLogged;
		console.log("ENTRE AL IF 2 ")
		//return res.send(res.locals.userLogged)
	} 

	next(); 
    } 

	
	/*console.log("COOKIES")
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


	next();*/
}

module.exports = userLoggedMiddleware;