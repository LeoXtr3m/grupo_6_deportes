const express         = require('express');
const router          = express.Router();
const productController = require('../controllers/productController');
const uploadFile = require('../Middleware/multerImagenProducto');


/// CREAR 

router.get('/create',productController.createBD); // Listado de productos por categoria, si lleva ID es detalle de productos por id
router.post('/create',uploadFile.single('imagen'),productController.guardado); // Listado de productos por categoria, si lleva ID es detalle de productos por id

/// LISTAR
router.get('/',productController.list); // Listado de productos por categoria, si lleva ID es detalle de productos por id




// VER POR ID 
router.get('/:category?/:id?',productController.detail); // Listado de productos por categoria, si lleva ID es detalle de productos por id




module.exports = router; 