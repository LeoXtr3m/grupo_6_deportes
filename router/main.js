const express         = require('express');
const router          = express.Router();
const mainControlador = require('../controllers/mainController');
const productController = require('../controllers/productController');

// ****** MULTER **********
const multer = require('multer');     /// mandar llamar la libreria de multer
const path = require('path');    // PARA PODER USAR EL __dirname
//// ************

///////////////////           MULTER    --GUARDAR IMAGEN DEL PRODUCTO     

const storage = multer.diskStorage({                     // guardar la informacion en una variable storage
    destination: (req, file, cb) => {                         //// CONFIGURAR DONDE SE GUARDARA EL ARCHIVO 
      cb(null, path.join(__dirname, '../public/images/products'));     // LO LLEVA A LA CARPETA IMAGENES 
    },
    filename: (req, file, cb) => {      /// DATOS DE COMO SE GUARDARA EL ARCHIVO 
      //console.log(file);
      const newFilename = 'producto-' + Date.now() + path.extname(file.originalname);  // SE LE DA EL NOMBRE A LA IMGAEN 
                                                                                    // Date.now es para generar un numero de acuerdo al tiempo en milisegundos
                                                                                   // path.extname es para agregar la extencion a la imagen 
                                                                                   // file.originalname  permite dejarle la extencion original al archivo
      cb(null, newFilename)
    }
  });
  
  const uploadFILE = multer({ storage: storage })     /// se guarda todo esto en la variable upload
  
  ///////////////////////////////////////////







router.get('/',mainControlador.index);
router.get('/productCart',mainControlador.productCart);
router.get('/productDetail',mainControlador.productDetail);
router.get('/productos',mainControlador.productos);
router.get('/login',mainControlador.login);
router.get('/register',mainControlador.register);
router.get('/create',mainControlador.create);
router.post('/create',uploadFILE.single('imagen'),productController.newProduct);

router.get('/edit',mainControlador.edit);
module.exports = router;