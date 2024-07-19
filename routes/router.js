const express = require('express');
const router = express.Router();
//const conexion = require('../database/db');

const authController = require('../controllers/authController');
const reseta_controller = require('../controllers/reseta_controller');
const pasienteController = require('../controllers/pasienteController');
const concController = require('../controllers/concController');
const formaController = require('../controllers/formaController');
const familiaController = require('../controllers/familiaController');
const presentController = require('../controllers/presentController');
const medicamentoController = require('../controllers/medicamentoController');
const espeController = require('../controllers/espeController');
const profController = require('../controllers/profController');
const refeController = require('../controllers/refeController');
const prescController = require('../controllers/prescController');


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

router.post('/caragarPresc',reseta_controller.cargarPresc);
router.post('/inprimir',reseta_controller.imprimirReceta);
router.post('/invoice',reseta_controller.imprimirReceta);

// metodos para gestionar resetas
router.get('/gestionReseta', (req, res)=> {
      res.render('crear_reseta/gestion_reseta',{alert: false} );
});
router.get('/editPresc/:id', (req, res)=> {
      res.render('crear_reseta/editPresc',{alert: false} );
});
router.get('/buscarPresc',prescController.findAll);








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


//rutas concentracion
router.get('/atributos_med',(req, res)=> {
      res.render('medicamento/atributosMed',{alert: false});
});
router.get('/buscar_conc',concController.findAll);
router.post('/guardar_conc',concController.create);
router.get('/borrar_conc/:id_conc',concController.delete);
router.get('/buscarConc/:id',concController.findById);
router.post('/updateConc/:id',concController.update);
router.get('/buscar_conc0',concController.findAll0);
router.get('/altaConc/:id',concController.altaConc);

//rutas forma farmacologica

router.get('/buscar_form0',formaController.findAll0);
router.get('/buscar_forma',formaController.findAll);
router.get('/buscarForma/:id',formaController.findById);
router.post('/guardar_form',formaController.create);
router.get('/borrar_form/:id',formaController.delete);
router.get('/buscarForm',formaController.findById);
router.post('/updateForm/:id',formaController.update);
router.get('/altaForm/:id',formaController.altaForm);

//rutas familia

router.get('/buscar_fam0',familiaController.findAll0);
router.get('/buscar_fam',familiaController.findAll);
router.get('/buscarFam/:id',familiaController.findById);
router.post('/guardar_fam',familiaController.create);
router.get('/borrar_fam/:id',familiaController.delete);
router.get('/buscarFam',familiaController.findById);
router.post('/updateFam/:id',familiaController.update);
router.get('/altaFam/:id',familiaController.altaForm);

//rutas presentacion

router.get('/buscar_present0',presentController.findAll0);
router.get('/buscar_present',presentController.findAll);
router.get('/buscarPresent/:id',presentController.findById);
router.post('/guardar_present',presentController.create);
router.get('/borrar_present/:id',presentController.delete);
router.get('/buscarPresent',presentController.findById);
router.post('/updatePresent/:id',presentController.update);
router.get('/altaPresent/:id',presentController.alta);

//rutas medicamento

router.get('/crea_medicamento',(req, res)=> {
      res.render('medicamento/crear_medicamento',{alert: false});
});
router.get('/buscar_medica0',medicamentoController.findAll0);
router.get('/buscar_medica',medicamentoController.findAll);
router.get('/buscarMedica/:id',medicamentoController.findById);
router.post('/guardar_medica',medicamentoController.create);
router.get('/borrar_medica/:id',medicamentoController.delete);
router.get('/buscarMedica',medicamentoController.findById);
router.post('/updateMedica/:id',medicamentoController.update);
router.get('/altaMedica/:id',medicamentoController.alta);


//rutas especialidad

router.get('/buscar_espe0',espeController.findAll0);
router.get('/buscar_espe',espeController.findAll);
router.get('/buscarEspe/:id',espeController.findById);
router.post('/guardar_espe',espeController.create);
router.get('/borrar_espe/:id',espeController.delete);
router.get('/buscarEspe',espeController.findById);
router.post('/updateEspe/:id',espeController.update);
router.get('/altaEspe/:id',espeController.alta);
router.get('/especialidad', (req, res)=> {
      res.render('profesional/crear_especialidad',{alert: false} );
});

//rutas refeps

router.get('/buscar_refe0',refeController.findAll0);
router.get('/buscar_refe',refeController.findAll);
router.get('/buscarRefe/:id',refeController.findById);
router.post('/guardar_refe',refeController.create);
router.get('/borrar_refe/:id',refeController.delete);
router.get('/buscarRefe',refeController.findById);
router.post('/updateRefe/:id',refeController.update);
router.get('/altaRefe/:id',refeController.alta);
router.get('/refeps', (req, res)=> {
      res.render('profesional/crear_refeps',{alert: false} );
});



//rutas profesionales

router.get('/profesional', (req, res)=> {
      res.render('profesional/crear_profesional',{alert: false} );
});
router.get('/altaProf',(req, res)=> {
      res.render('profesional/altaProfBorrado',{alert: false});
});
router.get('/buscar_prof',profController.findAll);
router.get('/buscar_prof0',profController.findAll0);
router.get('/buscarProf/:id',profController.findById);
router.post('/guardar_prof',profController.create);
router.get('/BorrarProf/:id',profController.delete);
router.post('/updateProf/:id',profController.update);
router.get('/alta_Prof/:id',profController.alta);

module.exports = router;