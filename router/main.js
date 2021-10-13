const express         = require('express');
const router          = express.Router();
const mainControlador = require('../controllers/mainController');
const productController = require('../controllers/productController');


//// MIDDLEWARE 
//const multerImagenProducto = require('../Middleware/multerImagenProducto');


// ****** MULTER **********
const multer = require('multer');     /// mandar llamar la libreria de multer
const path = require('path');    // PARA PODER USAR EL __dirname
//// ************

/////////        MIDDLEWARE  VALIDACION  QUE SE ESCRIBIO BIEN EL REGISTRO          
const {body} = require('express-validator');


const uploadFile = require('../Middleware/multerImagenProducto');
const uploadFileUser = require('../Middleware/multerImagenUser');
const guestMiddleware = require('../Middleware/guestMiddleware');
 ////////////////////////////////////////



///////////////////           MULTER    --GUARDAR IMAGEN DEL PRODUCTO     
  
  ///////////////////////////////////////////

  ///// VALIDATION OF REGISTER  
  const validationCreateForm = [
    body("firstName").notEmpty().withMessage("Debes de ingresar un nombre"), // si el campo no esta vacio se ejecuta esto
    body("firstName").isAlpha().withMessage("Debes de ingresar un nombre"), // si el campo no esta vacio se ejecuta esto
    body("lastName").notEmpty().withMessage("Debes de ingresar un apellido"), // si el campo no esta vacio se ejecuta esto
    body("lastName").isAlpha().withMessage("Debes de ingresar un apellido"), // si el campo no esta vacio se ejecuta esto
    body("age").isNumeric().withMessage("Debes de ingresar la edad"), // si el campo esta vacio se ejecuta esto
    body("numberCel").isNumeric().withMessage("Debes de ingresar un numero de telefono valido"), // si el campo esta vacio se ejecuta esto
    body('email').isEmail().withMessage("Debes de ingresar un email valido"), // si no es un email, se envia este mensaje
    body('password').isLength({min:8}).withMessage("La contraseña debe de tener minimo 8 caracteres"), // si no es un email, se envia este mensaje
    body('profile_photo').custom((value, {req}) => {
      let file = req.file; 
      let acceptedExtensions = ['.jpg', '.png', '.gif'];
      let fileExtension = path.extname(file.originalname);
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



router.get('/' , mainControlador.index); // Pagina de inicio

router.get('/login', mainControlador.login); // Login de usuario
router.post('/login',mainControlador.enterLogin); // Logearse de usuario
//guestMiddleware
router.get('/register',mainControlador.register); // Registro de usuario
router.post('/register', uploadFileUser.single('profile_photo'), validationCreateForm, mainControlador.addUser);


router.get('/productCart',guestMiddleware, productController.productCart); // Carrito de compras
//router.get('/products/:category?/:id?',productController.products); // Listado de productos por categoria, si lleva ID es detalle de productos por id

//router.get('/create', productController.create);
//router.post('/create',uploadFile.single('imagen'),productController.newProduct);

router.get('/profile',guestMiddleware, mainControlador.profile); // Carrito de compras

//router.post('/create',uploadFile.single('imagen'),productController.newProduct);

router.get('/edit',guestMiddleware, productController.edit);

router.get('/logout',mainControlador.logout);

// BUSCADOR
router.post('/search',mainControlador.search); // Listado de productos por categoria, si lleva ID es detalle de productos por id


module.exports = router;