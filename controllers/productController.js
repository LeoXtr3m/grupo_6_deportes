const fs = require('fs');
const path = require('path');
//const { productos } = require('./mainController');

///JSON PRODUCTOS
const productsFilePath = path.join(__dirname, '../database/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

///JSON PRODUTOS POR CATEGORIAS 
const productsFilePathFutbol = path.join(__dirname, '../database/productosFutbol.json');
const productsFutbol = JSON.parse(fs.readFileSync(productsFilePathFutbol, 'utf-8'));
const productsFilePathBasquetbol = path.join(__dirname, '../database/productosBasquetbol.json');
const productsBasquetbol = JSON.parse(fs.readFileSync(productsFilePathBasquetbol, 'utf-8'));
const productsFilePathBeisbol = path.join(__dirname, '../database/productosBeisbol.json');
const productsBeisbol = JSON.parse(fs.readFileSync(productsFilePathBeisbol, 'utf-8'));
const productsFilePathFutbolAmericano = path.join(__dirname, '../database/productosFutbolAmericano.json');
const productsFutbolAmericano = JSON.parse(fs.readFileSync(productsFilePathFutbolAmericano, 'utf-8'));

/// 
const JSONFutbol = require('../database/productosFutbol.json')

const productControlador = {
    products: (req, res) => {


      //return res.send(req.params.category)

      if (req.params.category == undefined) { // Si no se manda la caregoria nos muestra todos los productos
          
          res.render('../views/products/productos.ejs', {productos:products})
      } else {

           var categoria;
          if (req.params.category != undefined) { // Si solo se manda la categoria y no el id muestra todos los productos de esa categoria
              // return res.send("aqui estoy2 !! :D")
              if(req.params.category === "Futbol"){
                  categoria = productsFutbol;
              }
              else if (req.params.category === "Basquetbol"){
                  categoria = productsBasquetbol;
              }
              else if (req.params.category === "Beisbol"){
                  categoria = productsBeisbol;
              }
              else if (req.params.category === "FutbolAmericano"){
                  categoria = productsFutbolAmericano;
              }


              var archivoProductos;

              if(categoria == ""){
                  misProductos =[];        // no pasa nada a la variable 
              }
              else {
                  misProductos = categoria;    /// Descomprime el archivo el archivo JSON a la variable misProductos
              }
                    /// SI TODAVIA NO SE SELECCIONA UN PRODUCTO ENTRA AQUI 
                  if (req.params.id === undefined) { 
                  
                      let productosList = misProductos.filter(producto => producto.category == req.params.category); // Guardar nueva lista de productos filtrados por categoria
                      //console.log(misProductos)
                      res.render('../views/products/productos.ejs', {
                          productos:productosList
                      })
                  }
              
                    /// SI YA SE SELECCIONO UN PRODUCTO ENTRA AQUI 
                    if (req.params.id != undefined) { // Si se manda la categoria y el id muestra el detalle del producto          
                        
                    //let producto = misProductos.filter(producto => producto.id == req.params.id); // Se filtra producto por ID
                    //let producto = JSONFutbol.find(oneUser => oneUser['id'] === req.params.id); 
                    let producto = JSONFutbol.find(producto => producto.id == req.params.id);
                    //console.log(producto)
                    //    return res.send("el producto " + producto + " id " + req.params.id)
                    return res.render('../views/products/productDetail.ejs', {
                            'producto':producto
                        }
                    );  
                    }

            }
      }  
    },


    productCart: (req, res) => {
        res.render('../views/products/productCart.ejs');
    },

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