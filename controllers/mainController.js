
const controlador = {

    index: (req, res) => {
        res.render('../views/products/index.ejs');
    },
    productCart: (req, res) => {
        res.render('../views/products/productCart.ejs');
    },
    productDetail: (req, res) => {
        res.render('../views/products/productDetail.ejs');
    },
    productos: (req, res) => {
        res.render('../views/products/productos.ejs');
    },
    login: (req, res) => {
        res.render('../views/users/login.ejs');
    },
    register: (req, res) => {
        res.render('../views/users/register.ejs');

    },
};

module.exports = controlador;