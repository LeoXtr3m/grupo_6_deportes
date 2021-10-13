const express         = require('express');
const router          = express.Router();
const productController = require('../controllers/productController');
const uploadFile = require('../Middleware/multerImagenProducto');
const path = require('path');    // PARA PODER USAR EL __dirname

/////////        MIDDLEWARE  VALIDACION  QUE SE ESCRIBIO BIEN EL REGISTRO          
const {body} = require('express-validator');


  ///// VALIDATION OF REGISTER  
  const validationCreateForm2 = [
    body("nameProductoNew").notEmpty().isLength({min:5}).withMessage("Debes de ingresar un nombre mayor a 5 caracteres"), // si el campo no esta vacio se ejecuta esto
    body("precio").isNumeric().withMessage("Debes de ingresar el precio del producto"), // si el campo no esta vacio se ejecuta esto
    body("cantidad").isNumeric().withMessage("Debes de ingresar la cantidad de producto en stock"), // si el campo no esta vacio se ejecuta esto
    body("descripcion").isLength({min:20}).withMessage("Debes de ingresar minimo 20 caracteres"), // si el campo esta vacio se ejecuta esto
    body('imagen').custom((value, {req}) => {
      let file = req.file; 
      let acceptedExtensions = ['.jpg', '.png', '.gif'];
      if (!file) {
        throw new Error('Tienes que subir una imagen');
      }else{
        let fileExtension = path.extname(file.originalname);
        if(!acceptedExtensions.includes(fileExtension)){
          throw new Error(`Las exteciones permitidas son ${acceptedExtensions.join(', ')} `);
        }
      }
      return true;
    })

  
  ];

/// CREAR 

router.get('/create',productController.createBD); // Listado de productos por categoria, si lleva ID es detalle de productos por id
router.post('/create',uploadFile.single('imagen'),validationCreateForm2, productController.guardado); // Listado de productos por categoria, si lleva ID es detalle de productos por id

/// LISTAR
router.get('/',productController.list); // Listado de productos por categoria, si lleva ID es detalle de productos por id




// VER POR ID 
router.get('/:category?/:id?',productController.detail); // Listado de productos por categoria, si lleva ID es detalle de productos por id




module.exports = router; 