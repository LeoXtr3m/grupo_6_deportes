const fs = require('fs');
const path = require('path');

/// LIBRERIAS PARA BUSCADOR 
const Sequelize = require('sequelize')
const Op = Sequelize.Op;


const categorias = require("../database/categorias.json");

//////// Traer a SEQUELIZE
let db = require("../database/models")

///JSON USUARIOS
const usersFilePath = path.join(__dirname, '../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

/// bcryptjs
let bcryptjs = require('bcryptjs');


//// MULTER VALIDATION 
const {validationResult} = require("express-validator");





const controlador = {

    index: (req, res) => {
        //return res.send("aqui estoyyyy")
        // return res.send(categorias)
   
        db.Categorias.findAll()
            .then(function(categorias2){
                // return res.send(categorias2)
                 res.render('../views/products/index.ejs', {categorias:categorias2});
        })  
        
    },
    login: (req, res) => {
       console.log("Estoy en login s")
        console.log(req.cookies.testing)
        res.render('../views/users/login.ejs');
    },
    enterLogin: (req, res) => {
        //
        //return res.send(req.body)
        db.Usuarios.findOne({     // Busca en todas las categorias el valor dado en where // NOMAS TRAE 1 VALOR 
            where:{
                email: req.body.correo   // busca de las categorias, los que coincidan con el nombre dado 
            }
        })
            .then(function(userEncontrado){
                if(userEncontrado != undefined){  // Si el usuario se encuentra en el archivo json... entra 
                    let passwordCorrecto = bcryptjs.compareSync(req.body.contraseña, userEncontrado.password);
                    if(passwordCorrecto){
                        delete userEncontrado.password;  // borrar el password por seguridad en el loggin 
                        req.session.userLogged = userEncontrado;  //almacena el usuario loggeado para que siga logeado 
                        //return res.send(req.session.userLogged);
                        //req.locals.userLogged = userEncontrado;
                        res.locals.isLogged = true;   /// INDICA QUE SE INICIO SESION 
                         //return res.send(req.body.correo)
                        if(req.body.remember_user == "on"){
                            console.log("ENtre a guardar el USUARIO A LA COOKIE")
                          //  return res.send("voy a recordar el inicio de sesion " + req.body )
                            res.cookie('userEmail', req.body.correo, {maxAge : (1000*60)*10})  // Guarda lo que hay en req.body.correo en res.cookie.userEmail // en este caso el correo electronico de la persona que se loggea 
                            res.cookie('id', userEncontrado.id , {maxAge : (1000*60)*10})  // guarda el id del usuario logeado 
                        }
        
                        return res.redirect('/profile');
                       // res.render('../views/users/userProfile.ejs', {userEncontrado:userEncontrado});
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
            })

    },
    register: (req, res) => {
        res.cookie('testing', 'hola mundo!!-Entraste a registrarte', { maxAge: 1000*30})
        res.render('../views/users/register.ejs');
//////////////////
    },
    addUser: (req, res) => {

        let errors = validationResult(req);
        //let errors2 = errors.mapped()
        //console.log(errors2)
        //return res.send(errors2)
        if(errors.isEmpty()) {    /// SI HAY ALGUN ERROR, NO ENTRARA AQUI, EL ERROR LO VALIDA EN ROUTER en la variable "validationResult"
            if(req.body.password==req.body.password2){
                    var registrado = [];
                    db.Usuarios.findOne({     // Busca en todas las categorias el valor dado en where 
                        where:{
                            email: req.body.email   // busca de las categorias, los que coincidan con el nombre dado 
                        }
                    })
                        .then(function(resultado){
                            if(resultado == undefined){
                                console.log("es undefined LEOOO ")
                                let passwordOld = req.body.password;
                                let passwordNew = bcryptjs.hashSync(passwordOld,10);
                                db.Usuarios.create({

                                    firstName: req.body.firstName,
                                    lastName : req.body.lastName,
                                    email : req.body.email,
                                    password : passwordNew,
                                    age : req.body.age,
                                    numberCel : req.body.numberCel,
                                    profilePhoto_id : req.file.filename // se agrega el id del usuario que esta logeado para identificar sus productos 
                        
                                })
                                res.redirect('/login')
                            }
                            else{
                                console.log("si tiene info LEOOO ")
                                let usuarioLogeado = "El usuario ya esta registrado, ingrese con otro email";
                                res.render('../views/users/register.ejs', {usuarioLogeado:usuarioLogeado, old:req.body});
        
                            }
                        })

            }
            else{
                let paswordIncorrecto = "Los paswwords ingresados no coinciden";
                res.render('../views/users/register.ejs', {paswordIncorrecto:paswordIncorrecto, old:req.body});
            }
        }
        else {            /// SI NO SE SUBIO UNA IMAGEN NO  ENTRA
            //let old=req.body; 
           //return res.send(req.body)
            res.render('../views/users/register.ejs', {errors: errors.mapped(), old:req.body});   /// LOS ERRORES SE PASAN A UN ARRAY PARA DEVOLVERLOS           
         // res.send({errors: errors.array()});
        }


    },

    profile: (req, res) => {

        console.log(req.cookies.userEmail)
        //delete userEncontrado.password;  // borrar el password por seguridad en el loggin 
         // userEncontrado =  req.session.userLogged; //almacena el usuario loggeado para que siga logeado  
        // return res.send(userEncontrado)
      //  res.render('../views/users/userProfile.ejs', {userEncontrado:userEncontrado});
        return res.render('../views/users/userProfile.ejs', {
            userEncontrado: req.session.userLogged
        });

    },

    logout: (req,res) => {
        res.clearCookie("userEmail");
        req.session.destroy();
        return res.redirect('/');
    },

    search: (req, res) => {
        console.log("AQUI ESTOY " + req.body.keywords)
        if (req.body.keywords != undefined) { 
            db.Productos.findAll({     // Busca en todas las categorias el valor dado en where 
                where:{
                    //name: req.body.keywords   // busca de las categorias, los que coincidan con el nombre dado 
                    name:{ [Op.like]: '%'+ req.body.keywords +'%' }


                }
            })
                .then(function(category){
                    if(category != undefined){
                        res.render("../views/products/productos.ejs", {productos:category})
                    }

                    else{
                        console.log("NO LLEVO NADA = " + category)
                        return res.render("ENTRE NO LLEVO NADA -" + category)
                    }
                    
                    
                
                
                })
            
            }
        else{
             return res.redirect('/');
        }
        
   

    },

    productsOwn:(req,res) => {
       console.log("Buscare la informacion del usuario : ")
       console.log(req.cookies.id)
       console.log("Buscare en session : ")
       console.log(req.session.userLogged)
       console.log("Buscare en session2 : ")
       console.log(req.session.userLogged.id)
        //return res.send("propiedad")
        db.Productos.findAll({
            where:{
                usuario_id: req.session.userLogged.id
            }
        })
                .then(function(productos){
                    console.log(productos);
                    let usuario = req.session.userLogged
                    res.render("../views/products/productos.ejs", {productos:productos, usuario:usuario})
                })
    },

};


module.exports = controlador;