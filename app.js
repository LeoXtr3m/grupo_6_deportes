const express = require('express');
const app = express();

const path = require('path');

app.use(express.static('public'));

app.listen(3000, () => console.log('Server running in 3000 port'));

app.get('/',(req,res) => {
    res.sendFile(path.resolve('./views/index.html'));
});

app.get('/productos',(req,res) => {
    res.sendFile(path.resolve('./views/productos.html'));
});

app.get('/productDetail',(req,res) => {
    res.sendFile(path.resolve('./views/productDetail.html'));
});

app.get('/productCart',(req,res) => {
    res.sendFile(path.resolve('./views/productCart.html'));
});

app.get('/register',(req,res) => {
    res.sendFile(path.resolve('./views/register.html'));
});

app.get('/login',(req,res) => {
    res.sendFile(path.resolve('./views/login.html'));
});