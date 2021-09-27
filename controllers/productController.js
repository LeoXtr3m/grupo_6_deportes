const { Console } = require('console');
const fs = require('fs');
const path = require('path');
//////// Traer a SEQUELIZE 

let db = require("../database/models")


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
                console.log(generos)
               // return res.render("aqui estoy", generos)
                //return res.render("../views/products/productCreate.ejs", {generos:generos})
                return res.render("../views/products/productCreate.ejs", {generos:generos})
            })  

    },

    guardado: (req, res) => {
        //return res.send(req.body)
        db.Productos.create({
            name : req.body.nameProductoNew,
            price : req.body.precio,
            discount : req.body.descuento,
            description : req.body.descripcion,
            image : req.file.filename ,
            category_id : req.body.deporte,
            cantidad : req.body.cantidad,
            usuario_id : req.session.userLogged.id, // se agrega el id del usuario que esta logeado para identificar sus productos 

        })
        res.redirect('/products')

    },

    list: (req, res) => {
        
        db.Productos.findAll()
                .then(function(productos){
                    console.log(productos);
                    res.render("../views/products/productos.ejs", {productos:productos})
                })

    },

    detail: (req, res) => {

        if (req.params.category == undefined) { // Si no se manda la caregoria nos muestra todos los productos
          
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
                                            console.log(producto)
                                            let resultado
                                            if(producto == null){
                                             resultado = []     // si la categoria no tiene productos, no imprime nada
                                            }
                                            else{
                                            resultado = producto            // convierte en array el resultado de los productos                                
                                            }

                                              res.render("../views/products/productos.ejs", {productos:resultado})
                                        })          
                                
                            })


                    }
                
                      /// SI YA SE SELECCIONO UN PRODUCTO ENTRA AQUI 
                      console.log(req.params)
                      //return res.send("aqui estoy :* 7  " + req.params )
                      if (req.params.category >=  0) { // Si se manda la categoria y el id muestra el detalle del producto          
                        //return res.send("aqui estoy :* 7  " + req.params )
                        db.Productos.findByPk(req.params.category)
                        .then(function(producto){
                            console.log(producto)
                            // return res.send("aqui estoy :* 2  " + productos)
                            res.render('../views/products/productDetail.ejs', {producto:producto})
                        }) 
                      
                      }

        }

    },

    productCart: (req, res) => {
        console.log("se imprime informacion del usuario: ")
        console.log(req.session.userLogged) 
        console.log("se imprime informacion del producto: ")
        console.log("aqui...") 

        db.Carrito.findAll({   // busca en la base de datos de productos el ID de la categoria buscada 
            where:{
                usuario_id: req.session.userLogged.id  // se busca el id de categoria en el producto 
            }
        }) 
        .then(function(informacion){

            if(informacion == undefined){
                carrito = [];
                res.render('../views/products/productCart.ejs', {carrito:carrito})
            }
            else{

               console.log("Esto va al carrito : ")
               var productosCarrito = []
               for (let productosEnCarrito of informacion) {
                db.Productos.findAll({   // busca en la base de datos de productos el ID de la categoria buscada 

                })  // se busca el id de categoria en el producto 
                    .then(function(productos){
                        console.log("VENTAS !!!! ")

                        res.render('../views/products/productCart.ejs', {productos:productos, informacion:informacion})
                    })
               }

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
        res.render('../views/products/productCreate.ejs');

    },
    edit: (req, res) => {
        res.render('../views/products/productEdit.ejs');

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

    
};

module.exports = productControlador;