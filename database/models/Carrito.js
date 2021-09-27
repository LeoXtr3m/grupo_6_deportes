module.exports = function(sequelize, dataTypes){
    let alias = "Carrito";

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id:{
            type: dataTypes.INTEGER 
        },
        producto_id:{
            type: dataTypes.INTEGER 
        },
        fecha:{
            type: dataTypes.DATE 
        },
        cantidad:{
            type: dataTypes.INTEGER
        },
        total:{
            type: dataTypes.INTEGER
        },
        comprado:{
            type: dataTypes.BOOLEAN
        } 
    }


    let config = {
        tableName: "carrito",
        timestamps: false
    }



    let Carrito = sequelize.define(alias,cols,config);

    /*Carrito.associate = function (models){
        Carrito.belongsTo(models.Usuarios, {
            as: "usuarioCompra",
            //foreignKey:"category_id"
            foreignKey:"id",
            //targetKey:"id" 
        });

        Carrito.belongsTo(models.Productos, {
            as: "productosCompra",
            foreignKey:"id"
        });
    } */

    return Carrito; 



}