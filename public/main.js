const fs = require('fs');
const path = require('path');

/// LIBRERIAS PARA BUSCADOR 
const Sequelize = require('sequelize')
const Op = Sequelize.Op; 

//////// Traer a SEQUELIZE
let db = require("../database/models")


db.Productos.findAll()
.then(function(productos){
            // return res.send(categorias2)
             var imagenes = [];
            for(let i in productos){
                    imagenes[i] = i.image 
            }
            console.log("AQUIII ESTOY LEO")
            var cont = 0;
                

            function carrousel(contenedor){
                console.log("AQUIII ESTOY")
                contenedor.addEventListener('click', e => {
                    let atras = contenedor.querySelector('.atras'),
                        adelante = contenedor.querySelector('.adelante'),
                        img = contenedor.querySelector('img'),
                        tgt = e.target;

                    if(tgt == atras){
                        if(cont >0){
                            img.src = imagenes[cont - 1];
                            cont--;

                        }else{
                            img.src = imagenes[imagenes.length - 1];
                            cont = imagenes.length - 1;

                        }
                    }else if(tgt == adelante){
                        if(cont > imagenes.length - 1){
                            img.src = imagenes[cont + 1];
                            cont++;

                        }else{
                            img.src = imagenes[0];
                            cont = 0; 

                        }
                    }
                });
            }

            document.addEventListener("DOMContentLoaded", () =>{
                let contenedor = document.querySelector('.contenedor');

                carrousel(contenedor);
            });


})