module.exports = function(sequelize, dataTypes){
    let alias = "Categorias";

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: dataTypes.STRING 
        },
        imagen:{
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: "categorias",
        timestamps: false
    }

    let Categorias = sequelize.define(alias,cols,config);

    Categorias.associate = function (models){
        Categorias.hasMany(models.Productos, {
            as: "productos",
            foreignKey:"category_id"
        });
    }


    return Categorias; 



}