const path = require ('path');

const controlador = {
    home: (req, res) => {
        res.sendFile(path.resolve('/views/products/index.ejs'));
    },
};
module.exports = controlador;