const fs = require('fs');
const path = require('path');
const categorias = require("../database/categorias.json");

const controlador = {

    index: (req, res) => {
        res.render('../views/products/index.ejs', {categorias:categorias});
    },
    login: (req, res) => {
        res.render('../views/users/login.ejs');
    },
    register: (req, res) => {
        res.render('../views/users/register.ejs');

    }
};

module.exports = controlador;