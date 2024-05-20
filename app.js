

const express = require('express');


const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');


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

app.listen(4000, ()=> { 
    console.log('SERVER RUNNING EN PUERTO 4000 http://localhost:4000')
});