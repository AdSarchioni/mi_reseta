const express = require('express');
const router = express.Router();
//const conexion = require('../database/db');

const authController = require('../controllers/authController');
const reseta_controller = require('../controllers/reseta_controller');
const pasienteController = require('../controllers/pasienteController');
//rutas para las vistas 
router.get('/', authController.isAuthenticated, (req, res)=> {
    //Sconexion();
      res.render('index',{user: req.user, alert: false });
});

router.get('/login', (req, res)=>{
      res.render('login', {alert: false});
});

router.get('/register', (req, res)=> {
      res.render('register',{alert: false} );
});
router.get('/preReseta', (req, res)=> {
      res.render('crear_reseta/pre_reseta',{alert: false} );
});


//rutas para metodos controller autorizacion
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout',authController.logout);

//rutas para metodos de crear reseta

router.get('/crea_reseta',authController.isAuthenticated,authController.esProf,reseta_controller.crea_reseta);
router.get('/buscaPa/:valorImput1',reseta_controller.paraListPas);
router.get('/pasciente',reseta_controller.dataPasciente);
router.get('/buscaProf/:valorImput1',reseta_controller.paraListProf);
router.post('/reseta_save',reseta_controller.save);
router.get('/prestaciones',reseta_controller.getPrestaciones);
router.get('/prestacionesId',reseta_controller.getPrestacionesId);
router.get('/medicamentos',reseta_controller.cargarMedDataList);
router.get('/dosis/dosisList', reseta_controller.getDosisList);
router.get('/cantidad/cantidadList', reseta_controller.getCantidadList);
router.get('/frecuencia/frecuenciaList', reseta_controller.getFrecuenciaList);
router.get('/duracion/duracionList', reseta_controller.getDuracionList);
router.get('/pre_reseta',(req, res)=> {
      res.render('crear_reseta/pre_reseta');
});
router.post('/caragarPresc',reseta_controller.cargarPresc);
router.post('/inprimir',reseta_controller.imprimirReceta);
router.post('/invoice',reseta_controller.imprimirReceta);

//rutas Pasiente
router.get('/crea_pasiente',(req, res)=> {
      res.render('pasiente/crear_pasiente',{alert: false});
});
router.get('/altaBorrado',(req, res)=> {
      res.render('pasiente/altaPasBorrado',{alert: false});
});
router.post('/guardar_pas', pasienteController.create);
router.get('/buscar_pas', pasienteController.findAll);
router.get('/buscar_pas0', pasienteController.findAll0);
router.get('/buscarObraPas', pasienteController.findAllPlans);
router.get('/buscarPas/:id', pasienteController.findById);
router.post('/updatePas/:id', pasienteController.update);
router.get('/borrarPas/:id', pasienteController.delete);
router.get('/altaPas/:id', pasienteController.altaPas);

//rutas medicamentos
router.get('/crea_medicamento',(req, res)=> {
      res.render('medicamento/crear_medicamento',{alert: false});
});


module.exports = router;