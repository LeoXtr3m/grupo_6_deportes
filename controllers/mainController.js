const fs = require('fs');
const path = require('path');
const categorias = require("../database/categorias.json");

///JSON USUARIOS
const usersFilePath = path.join(__dirname, '../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

/// bcryptjs
let bcryptjs = require('bcryptjs');


//// MULTER VALIDATION 
const {validationResult} = require("express-validator");





const controlador = {

    index: (req, res) => {
        res.render('../views/products/index.ejs', {categorias:categorias});
    },
    login: (req, res) => {
        res.render('../views/users/login.ejs');
    },
    enterLogin: (req, res) => {
        
        let userEncontrado = users.find(oneUser => oneUser['email'] === req.body.correo);  // Busca el email ingresado en el JSON de usuarios, si lo encuentra, regresa todo los datos
        if(userEncontrado != undefined){  // Si el usuario se encuentra en el archivo json... entra 
            let passwordCorrecto = bcryptjs.compareSync(req.body.contraseña, userEncontrado.password);
            if(passwordCorrecto){
                delete userEncontrado.password;  // borrar el password por seguridad en el loggin 
                req.session.userLogged = userEncontrado  //almacena el usuario loggeado para que siga logeado  
                res.render('../views/products/index.ejs', {categorias:categorias});
            }
            else{
                let passwordNoCorrecto = "El password es incorrecto";
                res.render('../views/users/login.ejs', {passwordNoCorrecto:passwordNoCorrecto});
            }
        }
        else{
           
            let usuarioNoLogeado = "El usuario no esta registrado";
            res.render('../views/users/login.ejs', {usuarioNoLogeado:usuarioNoLogeado});
        }
    },
    register: (req, res) => {
        res.render('../views/users/register.ejs');
//////////////////
    },
    addUser: (req, res) => {

        let errors = validationResult(req);
        if(errors.isEmpty()) {    /// SI HAY ALGUN ERROR, NO ENTRARA AQUI, EL ERROR LO VALIDA EN ROUTER en la variable "validationResult"
            if(req.body.password==req.body.password2){
                    let userFound = users.find(oneUser => oneUser['email'] === req.body.email);  // Busca el email ingresado en el JSON de usuarios, si lo encuentra, regresa todo los datos
                    if(userFound==undefined){  // Si el usuario no se encuentra en el archivo json... entra 

                    let passwordOld = req.body.password;
                    let passwordNew = bcryptjs.hashSync(passwordOld,10);
                    let user_new = {
                        id: users.length + 1,
                        firstName: req.body.firstName,
                        lastName : req.body.lastName,
                        email : req.body.email,
                        password : passwordNew,
                        age : req.body.age,
                        numberCel : req.body.numberCel,
                        profilePhoto : req.file.filename
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

                    }
                    else{
                       
                        let usuarioLogeado = "El usuario ya esta registrado, ingrese con otro email";
                        res.render('../views/users/register.ejs', {usuarioLogeado:usuarioLogeado});

                    }


            }
            else{
                let paswordIncorrecto = "Los paswwords ingresados no coinciden";
                res.render('../views/users/register.ejs', {paswordIncorrecto:paswordIncorrecto});
            }
        }
        else {            /// SI NO SE SUBIO UNA IMAGEN NO  ENTRA
            //let old=req.body; 
            res.render('../views/users/register.ejs', {errors: errors.array(), old:req.body});   /// LOS ERRORES SE PASAN A UN ARRAY PARA DEVOLVERLOS           
         // res.send({errors: errors.array()});
        }


    }



};


module.exports = controlador;