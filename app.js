const express = require('express');
const app = express();

const path = require('path');



app.use(express.static('public'));//Indica que usara la carpeta Public como estatica 
app.set('view engine', 'ejs'); // Par indicar que se usara las herramientas de ejs 



app.listen(3000, () => console.log('Server running in 3000 port'));

app.get('/',(req,res) => {
    res.sendFile(path.resolve('./views/products/index.ejs'));
});

app.get('/productos',(req,res) => {
    res.sendFile(path.resolve('./views/products/productos.ejs'));
});

app.get('/productDetail',(req,res) => {
    res.sendFile(path.resolve('./views/products/productDetail.ejs'));
});

app.get('/productCart',(req,res) => {
    res.sendFile(path.resolve('./views/products/productCart.ejs'));
});

app.get('/register',(req,res) => {
    res.sendFile(path.resolve('./views/users/register.ejs'));
});

app.get('/login',(req,res) => {
    res.sendFile(path.resolve('./views/users/login.ejs'));
});