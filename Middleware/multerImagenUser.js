const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../public/images/users'));     // LO LLEVA A LA CARPETA IMAGENES 
	},
	filename: (req, file, cb) => {
		const newFilename = 'Usuario-' + Date.now() + path.extname(file.originalname);  // SE LE DA EL NOMBRE A LA IMGAEN 
                                                                                  // Date.now es para generar un numero de acuerdo al tiempo en milisegundos
                                                                                 // path.extname es para agregar la extencion a la imagen 
                                                                                 // file.originalname  permite dejarle la extencion original al archivo
		cb(null, newFilename);
	}
})

const uploadFileUser = multer({ storage });

module.exports = uploadFileUser;



