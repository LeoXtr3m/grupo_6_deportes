const fs = require('fs');
const path = require('path');
const categorias = require("../database/categorias.json");

///JSON USUARIOS
const usersFilePath = path.join(__dirname, '../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controlador = {

    index: (req, res) => {
        res.render('../views/products/index.ejs', {categorias:categorias});
    },
    login: (req, res) => {
        res.render('../views/users/login.ejs');
    },
    register: (req, res) => {
        res.render('../views/users/register.ejs');
//////////////////
    },
    addUser: (req, res) => {
        let user_new = {
            id: users.length + 1,
            firstName: req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            password : req.body.password,
            age : req.body.age,
            numberCel : req.body.numberCel,
        }
        //return res.send(user_new);
		let archivoUsers = fs.readFileSync(usersFilePath);  // se guarda el JSON de los productos en la variable "archivoProductos"
		let misUsers;    // crea la variable mis productos para guardar el JSON "archivoProductos"
		
		if(archivoUsers == ""){
			misUsers =[];        // no pasa nada a la variable 
		}
		else {
			misUsers = JSON.parse(archivoUsers);    /// Descomprime el archivo el archivo JSON a la variable misProductos
		}

		misUsers.push(user_new);        /// PASA LOS NUEVOS DATOS DEL PRODUCTO AL ARCHIVO NUEVO JSON "MisProductos"

		NuevoJSONDeUsers = JSON.stringify(misUsers,null,2);    // Los datos nuevos los guarda como un array en NuevoJSONProductos

		fs.writeFileSync(usersFilePath, NuevoJSONDeUsers);  // escribe la informacion nueva al final del array del JSON anterior y lo actualiza

		res.redirect('/')
    },
};

module.exports = controlador;