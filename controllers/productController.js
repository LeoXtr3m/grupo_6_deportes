const { Console } = require('console');
const fs = require('fs');
const path = require('path');
//////// Traer a SEQUELIZE 

let db = require("../database/models")

//// MULTER VALIDATION 
const {validationResult} = require("express-validator");

//const { productos } = require('./mainController');

///JSON PRODUCTOS
const productsFilePath = path.join(__dirname, '../database/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

///JSON PRODUTOS POR CATEGORIAS 


/// 
const allProducts = require('../database/productos.json')

const productControlador = {
    createBD: (req, res) => {
        //return res.render("aqui estoy")
        db.Categorias.findAll()
            .then(function(generos){
               //console.log(generos)
               // return res.render("aqui estoy", generos)
                //return res.render("../views/products/productCreate.ejs", {generos:generos})
                return res.render("../views/products/productCreate.ejs", {generos:generos})
            })  

    },

    guardado: (req, res) => {
        let errors = validationResult(req);
        //let errors2 = errors.mapped()
        //console.log(req.body)
        //return res.send()
        if(errors.isEmpty()) {    /// SI HAY ALGUN ERROR, NO ENTRARA AQUI, EL ERROR LO VALIDA EN ROUTER en la variable "validationResult"
        //return res.send(req.body)
        db.Productos.create({
            name : req.body.nameProductoNew,
            price : req.body.precio,
            discount : req.body.descuento,
            description : req.body.descripcion,
            tipe : req.body.CategoryProductNew,
            image : req.file.filename ,
            category_id : req.body.deporte,
            cantidad : req.body.cantidad,
            usuario_id : req.session.userLogged.id, // se agrega el id del usuario que esta logeado para identificar sus productos 

        })
        console.log("aquii estoyyyy ")
        res.redirect('/products')
    }
    else {            /// SI NO SE SUBIO UNA IMAGEN NO  ENTRA
        db.Categorias.findAll()
        .then(function(generos){
           // console.log(generos)
            
             res.render('../views/products/productCreate.ejs', {errors: errors.mapped(), old:req.body, generos:generos});   /// LOS ERRORES SE PASAN A UN ARRAY PARA DEVOLVERLOS           
         })  
    }

    },

    list: (req, res) => {
        
        db.Productos.findAll()
                .then(function(productos){
                   // console.log(productos);
                    res.render("../views/products/productos.ejs", {productos:productos})
                })

    },

    detail: (req, res) => {
        
        let category_send = req.params.category 
        //console.log(category_send)
        //return res.send("aqui estoyyy en DETAIL ")

        if (req.params.category == undefined) { // Si no se manda la caregoria nos muestra todos los productos
            return res.send("aqui estoyyy 1")
            res.render('../views/products/productos.ejs', {productos:products})
        } else {
            
                    /// SI TODAVIA NO SE SELECCIONA UN PRODUCTO ENTRA AQUI
                    //let categorySelect =  req.params.category; 
                    if (req.params.id === undefined) { 
                        db.Categorias.findOne({     // Busca en todas las categorias el valor dado en where 
                            where:{
                                nombre: req.params.category    // busca de las categorias, los que coincidan con el nombre dado 
                            }
                        })
                            .then(function(category){
                                       db.Productos.findAll({   // busca en la base de datos de productos el ID de la categoria buscada 
                                            where:{
                                                category_id: category.id  // se busca el id de categoria en el producto 
                                            }
                                        }) 
                                        .then(function(producto){
                                            //console.log(producto)
                                            let resultado
                                            if(producto == null){
                                             resultado = []     // si la categoria no tiene productos, no imprime nada
                                            }
                                            else{
                                            resultado = producto            // convierte en array el resultado de los productos                                
                                            }
                                             

                                              res.render("../views/products/productos.ejs", {productos:resultado,category_send:category_send})
                                        })          
                                
                            })


                    }
                
                      /// SI YA SE SELECCIONO UN PRODUCTO ENTRA AQUI 
                      console.log("evaluando id  :")
                      //console.log(req.params.id)

                      console.log("ESTOY EN DETAIL")
                       
                      //return res.send("aqui estoy :* 7  " + req.params )
                      if (req.params.id >=  0) { // Si se manda la categoria y el id muestra el detalle del producto          
                        //return res.send("aqui estoy :* 7  " + req.params )
                        //return res.send("aqui estoy ahora")
                        db.Productos.findByPk(req.params.id)
                        .then(function(producto){
                            //console.log(producto)
                            usuario = req.session.userLogged
                            console.log("vamos a ver que trae el usuario ")
                            //console.log(usuario)
                            //return res.send("aqui estoyyy en DETAIL ")
                            //return res.send("AQUI ESTOY !!! LEO LEO LEO ")
                            if(usuario != undefined){
                                if(usuario.id == producto.usuario_id){
                                    res.render('../views/products/productDetail.ejs', {producto:producto, usuario:usuario})
                                }
                                else{
                                    res.render('../views/products/productDetail.ejs', {producto:producto})
                                }
                            }
                            else {
                                res.render('../views/products/productDetail.ejs', {producto:producto})
                            }
                            //  return res.send("aqui estoy :* 54  "  )
                            
                        }) 
                      
                      }

        }

    },

    productCart: (req, res) => {
        console.log("estoy en PRODUCTCART ")
        //console.log(req.session.userLogged) 
        //console.log("se imprime informacion del producto: ")
        //console.log("aqui...") 

        db.Carrito.findAll({   // busca en la base de datos de productos el ID de la categoria buscada 
            where:{
                usuario_id: req.session.userLogged.id  // se busca el id de categoria en el producto 
            }
        }) 
        .then(function(informacion){

            console.log("informacion de carrito : ")
            let i = 0;
            for(let carrito2 in informacion){
                console.log("-----------")
                i = i+1;
                console.log(i)
                console.log("-----------")
            console.log(carrito2.Carrito)
            }
                console.log("VAMOS A VER INFORMACION")
                 console.log(informacion)             
                 console.log("VAMOS A TERMINAR DE VER INFORMACION")

            if(informacion == undefined){
                carrito = [];
                res.render('../views/products/productCart.ejs', {informacion:carrito})
            }
            else{

               console.log("Esto va al carrito : ")
               var productosCarrito = []
              // for (let productosEnCarrito of informacion) {
                db.Productos.findAll()   // busca en la base de datos de productos el ID de la categoria buscada   // se busca el id de categoria en el producto 
                    .then(function(productos){

                       // console.log(productos)


                        //console.log("Vamos a ver informaicon")
                        //console.log(informacion)
                        
                        // return res.send("espera un poco ")
                        res.render('../views/products/productCart.ejs', {productos:productos, informacion:informacion})
                    })
             //  }

            }


        }) 


        //res.render('../views/products/productCart.ejs');
    },











    products: (req, res) => {

      if (req.params.category == undefined) { // Si no se manda la caregoria nos muestra todos los productos
          
          res.render('../views/products/productos.ejs', {productos:products})
      } else {

                    /// SI TODAVIA NO SE SELECCIONA UN PRODUCTO ENTRA AQUI 
                  if (req.params.id === undefined) { 
                  
                      let productosList = products.filter(producto => producto.category == req.params.category); // filtra todos los productos con la categoria dada 
                      //console.log(misProductos)
                      res.render('../views/products/productos.ejs', {
                          productos:productosList
                      })
                  }
              
                    /// SI YA SE SELECCIONO UN PRODUCTO ENTRA AQUI 
                    if (req.params.id != undefined) { // Si se manda la categoria y el id muestra el detalle del producto          
                    let producto = allProducts.find(producto => producto.id == req.params.id);  //BUSCA EL ARCHIVO CON EL ID DADO 
                    return res.render('../views/products/productDetail.ejs', {
                            'producto':producto
                        }
                    );  
                    }

            }
      },  
    


    /*productCart: (req, res) => {
        res.render('../views/products/productCart.ejs');
    },*/

    create: (req, res) => {
       // return res.render("aqui estoy ")
        res.render('../views/products/productCreate.ejs');

    },



    edit: (req, res) => {
        //return res.send("ando editando ")
        let editarProducto = db.Productos.findByPk(req.params.id)
        let generos = db.Categorias.findAll()
        //console.log("producto a editar")
        //console.log(editarProducto)
        //return res.send("hay la llevamos")
        Promise.all([editarProducto, generos])
            .then(function([producto, generos]){
                //console.log(producto)
                // return res.send("hay la llevamos 22")
                res.render('../views/products/productEdit.ejs', {old:producto, generos:generos});
            })
    },

    update:(req, res) => {
        console.log("AQUI ESTOY E ")
        //console.log(req.params)
        db.Productos.update({
            name : req.body.name,
            price : req.body.price,
            discount : req.body.discount,
            description : req.body.description,
            image : req.file.filename ,
            category_id : req.body.deporte,
            cantidad : req.body.cantidad,
            usuario_id : req.session.userLogged.id, // se agrega el id del usuario que esta logeado para identificar sus productos 
            tipe : req.body.CategoryProductNew
        }, {
            where:{
                id: req.params.id
            }
        })

        console.log("VOY A PRODUCTOS CON LA VARIABLE YA ACTUALIZADA")
        res.redirect('/products/')
    
    },

    delete:(req, res) => {
        //return res.send("aquiiiiiiiii delete")
        console.log("estoy en delete")
         db.Productos.destroy({
             where:{
                 id: req.params.id
             }
         })
        res.redirect('/products')
    
    },

    newProduct: (req, res) => {
       
       //if(req.params.category == "Futbol")

        var  FileCategory;
        if(req.body.deporte == "Futbol"){
            FileCategory = productsFilePathFutbol;
        }
        else if(req.body.deporte == "Basquetbol"){
            FileCategory = productsFilePathBasquetbol;
        }
        else if(req.body.deporte == "Beisbol"){
            FileCategory = productsFilePathBeisbol;
        }
        else if(req.body.deporte == "FutbolAmericano"){
            FileCategory = productsFilePathFutbolAmericano;
        }
        else{
            FileCategory = productsFilePath;
        }

        //return res.send(product_new);
        //return res.send("la categoria es: " + FileCategory );

        var archivoProductos = fs.readFileSync(FileCategory);  // se guarda el JSON de los productos en la variable "archivoProductos"

		//return res.send("estoy fuera");
		let misProductos;    // crea la variable mis productos para guardar el JSON "archivoProductos"
		
		if(archivoProductos == ""){
			misProductos =[];        // no pasa nada a la variable 
		}
		else {
			misProductos = JSON.parse(archivoProductos);    /// Descomprime el archivo el archivo JSON a la variable misProductos
		}

        let product_new = {
            id: misProductos.length + 1,
            name : req.body.nameProductoNew,
            price : req.body.precio,
            discount : req.body.descuento,
            description : req.body.descripcion,
            image : req.file.filename ,
            category : req.body.deporte,
            cantidad : 2,
        }


		misProductos.push(product_new);        /// PASA LOS NUEVOS DATOS DEL PRODUCTO AL ARCHIVO NUEVO JSON "MisProductos"

		NuevoJSONDeProductos = JSON.stringify(misProductos,null,2);    // Los datos nuevos los guarda como un array en NuevoJSONProductos

		fs.writeFileSync(FileCategory, NuevoJSONDeProductos);  // escribe la informacion nueva al final del array del JSON anterior y lo actualiza

		res.redirect('/products')


    },

    addCar:(req, res) => {
        console.log("PARAMS en ADDCAR")
        console.log(req.params)
        console.log("body ")
        console.log(req.body)
        let agrego = req.body.aniadir
        console.log("USUARIO LOGUEADO EN ADDCAR")
        console.log(req.session.userLogged)
        //return("Estoy en ADDCAR")
        
        db.Productos.findOne({     // Busca en todas las categorias el valor dado en where 
            where:{
                id: req.params.id    // busca de las categorias, los que coincidan con el nombre dado 
            }
        })
            .then(function(addCarProduct){
                resultado = addCarProduct.price
                let Total = (addCarProduct.price)*(req.body.cantidad)
                let today = new Date().toISOString().slice(0, 10);

                console.log("Estoy dentro para añadir el producto al carrito")
                console.log(addCarProduct)
                //return res.send("Entre a agregar el producto")

                if(agrego == 1){
                        console.log("ESTOY EN AñADIR DENTRO DEL FOR")
                    db.Carrito.create({

                        usuario_id: req.session.userLogged.id,
                        producto_id : addCarProduct.id,
                        fecha : today,
                        cantidad : req.body.cantidad,
                        total : Total,
                        comprado : 0
                    
            
                    })
                    
                }
            console.log("YA VOY A SALIR")
                //return res.send("aquiiiiiiiii estooooy 2")
                res.redirect('/productCart')

            })
    
    },
    deleteCar:(req, res) => {
        //return res.send("aquiiiiiiiii delete")
        console.log("Params ")
        console.log(req.params)
        console.log("body ")
        console.log(req.body)
        // return res.send("ESTOY EN DELETE CAR ")
         db.Carrito.destroy({
             where:{
                 id: req.params.id
             }
         })
        res.redirect('/productCart')
    
    },

    
};

module.exports = productControlador;