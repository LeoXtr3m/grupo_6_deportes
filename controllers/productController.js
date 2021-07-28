const fs = require('fs');
const path = require('path');
const { productos } = require('./mainController');

const productsFilePath = path.join(__dirname, '../database/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productControlador = {

    newProduct: (req, res) => {
        //return res.send("ESTOY AQUI");
        let product_new = {
            id: products.length + 1,
            name : req.body.nameProductoNew,
            price : req.body.precio,
            discount : req.body.descuento,
            description : req.body.descripcion,
            image : req.file.filename ,
            category : req.body.deporte,
            cantidad : 2,
        }
        //return res.send(product_new);
		let archivoProductos = fs.readFileSync(productsFilePath);  // se guarda el JSON de los productos en la variable "archivoProductos"
		let misProductos;    // crea la variable mis productos para guardar el JSON "archivoProductos"
		
		if(archivoProductos == ""){
			misProductos =[];        // no pasa nada a la variable 
		}
		else {
			misProductos = JSON.parse(archivoProductos);    /// Descomprime el archivo el archivo JSON a la variable misProductos
		}

		misProductos.push(product_new);        /// PASA LOS NUEVOS DATOS DEL PRODUCTO AL ARCHIVO NUEVO JSON "MisProductos"

		NuevoJSONDeProductos = JSON.stringify(misProductos,null,2);    // Los datos nuevos los guarda como un array en NuevoJSONProductos

		fs.writeFileSync(productsFilePath, NuevoJSONDeProductos);  // escribe la informacion nueva al final del array del JSON anterior y lo actualiza

		res.redirect('/productos')


    },

    
};

module.exports = productControlador;