

const express = require('express');


const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

const app =  express();

//seteamos el motor de plantillas
app.set ('view engine', 'ejs');

//seteamos la carpeta public para archivos estaticos
app.use(express.static('public'));
//para procesar datos enviad0os de formularios
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//seteamos las variables de entorno
dotenv.config({path: './env/.env'})
//para poder trabajar con las cookies
app.use(cookieParser());



//llamara nuestro enrutador
app.use('/', require('./routes/router'));


app.use(function(req, res, next){
    if(!req.user){
          res.header('cache-control', 'private, no-cache, no-store, must-revalidate');
    next();
    }
})



app.listen(3000, ()=> { 
    console.log('SERVER RUNNING EN PUERTO 3000 http://localhost:3000')
});