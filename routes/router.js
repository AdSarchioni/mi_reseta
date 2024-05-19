const express = require('express');
const router = express.Router();
const conexion = require('../database/db');

const authController = require('../controllers/authController');


//rutas para las vistas 
router.get('/', authController.isAuthenticated, (req, res)=> {
    //Sconexion();
      res.render('index',{user: req.user});
});

router.get('/login', (req, res)=>{
      res.render('login', {alert: false});
});

router.get('/register', (req, res)=> {
      res.render('register');
});



//rutas para metodos controller autorizacion
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout',authController.logout);

module.exports = router;