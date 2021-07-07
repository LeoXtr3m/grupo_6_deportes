
const controlador = {
    home: function(req,res){
        res.render('../views/products/index.ejs')  // index es el nombre de la vista 
    },
};
module.exports = controlador;