module.exports = function(sequelize, dataTypes){
    let alias = "Productos";

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING 
        },
        price:{
            type: dataTypes.INTEGER 
        },
        discount:{
            type: dataTypes.INTEGER 
        },
        description:{
            type: dataTypes.TEXT
        },
        description:{
            type: dataTypes.TEXT
        },
        image:{
            type: dataTypes.INTEGER
        },
        category_id:{
            type: dataTypes.INTEGER
        },
        cantidad:{
            type: dataTypes.INTEGER
        },
        usuario_id:{
            type: dataTypes.INTEGER
        }
    }


    let config = {
        tableName: "productos",
        timestamps: false
    }



    let Productos = sequelize.define(alias,cols,config);

    Productos.associate = function (models){
        Productos.belongsTo(models.Categorias, {
            as: "categoria",
            //foreignKey:"category_id"
            foreignKey:"category_id",
            //targetKey:"id" 
        });

    Productos.belongsToMany(models.Usuarios, {
        as: "usuarios",
        through: "Carrito",
        foreignKey:"producto_id",
        otherKey: "usuario_id",
        timestamps: false
    })
    
    }

    return Productos; 



}