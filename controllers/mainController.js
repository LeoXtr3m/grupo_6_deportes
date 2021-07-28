const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controlador = {

    index: (req, res) => {
        
        res.render('../views/products/index.ejs');
    },
    productCart: (req, res) => {
        res.render('../views/products/productCart.ejs');
    },

    productCreate: (req, res) => {
        res.render('../views/products/productCreate.ejs');
    },

    productDetail: (req, res) => {
        res.render('../views/products/productDetail.ejs');
    },
    productos: (req, res) => {
        let productos = products;
        //return res.send(productos)
        res.render('../views/products/productos.ejs', {'productos': productos});
    },
    login: (req, res) => {
        res.render('../views/users/login.ejs');
    },
    register: (req, res) => {
        res.render('../views/users/register.ejs');

    },
    create: (req, res) => {
        res.render('../views/products/productCreate.ejs');

    },
    edit: (req, res) => {
        res.render('../views/products/productEdit.ejs');

    },
};

module.exports = controlador;