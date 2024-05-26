const express = require('express');
const router = express.Router();
//const conexion = require('../database/db');

const authController = require('../controllers/authController');
const reseta_controller = require('../controllers/reseta_controller');

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

//rutas para metodos de crear reseta

router.get('/crea_reseta',reseta_controller.crea_reseta);
router.get('/buscaPa/:valorImput1',reseta_controller.paraListPas);
router.get('/buscaProf/:valorImput1',reseta_controller.paraListProf);
router.post('/reseta_save',reseta_controller.save);
router.get('/medicamentos',reseta_controller.cargarMedDataList);

router.get('/pre_reseta',(req, res)=> {
      res.render('crear_reseta/pre_reseta');
});


module.exports = router;