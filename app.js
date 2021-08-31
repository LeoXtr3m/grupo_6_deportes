const express    = require('express');
const app        = express();
const path       = require('path');
const port       = 3000;
const mainRouter = require('./router/main')
const userLoggedMiddleware = require('./Middleware/userLoggedMiddleware');


app.use(express.static('public'));//Indica que usara la carpeta Public como estatica 
app.set('view engine', 'ejs'); // Par indicar que se usara las herramientas de ejs 

app.use(express.urlencoded({extended: false })); // Para poder obtener correctamente el formato de imagenes al guardarlas .jpg .. etc

/// Session 
var session = require('express-session');
app.use(session({secret: 'Es secreto!!!'}));

app.use(userLoggedMiddleware)

app.use('/',mainRouter); // Producto
app.use('/login',mainRouter); // Usuario
app.use('/register',mainRouter); // Usuario
app.use('/productCart', mainRouter); // Carrito de compras
//app.use('/productDetail',mainRouter); // Detalle de producto
app.use('/products',mainRouter); // Productos por categorias
app.use('/create',mainRouter); // Crear un nuevo producto


app.listen(process.env.PORT || port, () => 
    console.log('Servidor corriendo en el puerto ' + port)
);


/*app.listen(3000, () => console.log('Server running in 3000 port'));

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
});*/



