module.exports = function(sequelize, dataTypes){
    let alias = "Usuarios";

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName:{
            type: dataTypes.STRING 
        },
        lastName:{
            type: dataTypes.STRING 
        },
        email:{
            type: dataTypes.STRING 
        },
        password:{
            type: dataTypes.STRING
        },
        age:{
            type: dataTypes.INTEGER
        },
        numberCel:{
            type: dataTypes.INTEGER
        },
        profilePhoto_id:{
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: "usuarios",
        timestamps: false
    }

    let Usuarios = sequelize.define(alias,cols,config);

    
    Usuarios.associate = function (models){
        Usuarios.belongsToMany(models.Productos, {
            as: "productos",
            through: "Carrito",
            foreignKey:"usuario_id",
            otherKey: "producto_id",
            timestamps: false
            
        });
    }

    /*Usuarios.associate = function (models){
        Usuarios.belongsTo(models.Carrito, {
            as: "carritoCompra",
            //foreignKey:"category_id"
            foreignKey:"id",
            //targetKey:"id" 
        });
    }*/

    return Usuarios; 



}