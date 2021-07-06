const express         = require('express');
const router          = express.Router();
const mainControlador = require('../controllers/mainController');

router.get('/',mainControlador.home);

module.exports = router;