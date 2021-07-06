const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static('/public/'));

app.set('view engine', 'ejs'); // Par indicar que se usara las herramientas de ejs 

const mainRouter = require('./router/main')

app.listen(process.env.PORT || port, () => 
    console.log('Servidor corriendo en el puerto ' + port)
);

app.use('/',mainRouter);
app.use('/productCart', mainRouter);
app.use('/productDetail',mainRouter);
app.use('/productos',mainRouter);
app.use('/login',mainRouter);
app.use('/register',mainRouter);