const express         = require('express');
const router          = express.Router();
const mainControlador = require('../controllers/mainController');

router.get('/',mainControlador.index);
router.get('/productCart',mainControlador.productCart);
router.get('/productDetail',mainControlador.productDetail);
router.get('/productos',mainControlador.productos);
router.get('/login',mainControlador.login);
router.get('/register',mainControlador.register);

module.exports = router;