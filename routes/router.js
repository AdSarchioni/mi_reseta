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
router.get('/buscaPa/:valorImput1',authController.isAuthenticated,authController.esProf,reseta_controller.paraListPas);
router.get('/pasciente',authController.isAuthenticated,authController.esProf,reseta_controller.dataPasciente);
router.get('/buscaProf/:valorImput1',authController.isAuthenticated,authController.esProf,reseta_controller.paraListProf);
router.post('/reseta_save',authController.isAuthenticated,authController.esProf,authController.isAuthenticated,authController.esProf,reseta_controller.save);
router.get('/prestaciones',authController.isAuthenticated,authController.esProf,reseta_controller.getPrestaciones);
router.get('/prestacionesId',authController.isAuthenticated,authController.esProf,reseta_controller.getPrestacionesId);
router.get('/medicamentos',authController.isAuthenticated,reseta_controller.cargarMedDataList);
router.get('/dosis/dosisList',authController.isAuthenticated,authController.esProf,reseta_controller.getDosisList);
router.get('/cantidad/cantidadList',authController.isAuthenticated,authController.esProf,reseta_controller.getCantidadList);
router.get('/frecuencia/frecuenciaList',authController.isAuthenticated,authController.esProf,reseta_controller.getFrecuenciaList);
router.get('/duracion/duracionList',authController.isAuthenticated,authController.esProf,reseta_controller.getDuracionList);

router.post('/caragarPresc',authController.isAuthenticated,authController.esProf,reseta_controller.cargarPresc);
router.post('/inprimir',authController.isAuthenticated,authController.esProf,reseta_controller.imprimirReceta);
router.post('/invoice',authController.isAuthenticated,authController.esProf,reseta_controller.imprimirReceta);

// metodos para gestionar resetas
router.get('/gestionReseta',authController.isAuthenticated,prescController.user);
router.get('/editPresc/:id',authController.isAuthenticated,prescController.findById);
router.get('/buscarPresc',authController.isAuthenticated,prescController.findAll);
router.post('/generate-pdf',authController.isAuthenticated,prescController.printPdf);







//rutas Pasiente
router.get('/crea_pasiente',authController.isAuthenticated,(req, res)=> {
      res.render('pasiente/crear_pasiente',{alert: false});
});
router.get('/altaBorrado',authController.isAuthenticated,(req, res)=> {
      res.render('pasiente/altaPasBorrado',{alert: false});
});
router.post('/guardar_pas',authController.isAuthenticated,pasienteController.create);
router.get('/buscar_pas',authController.isAuthenticated,pasienteController.findAll);
router.get('/buscar_pas0',authController.isAuthenticated,pasienteController.findAll0);
router.get('/buscarObraPas',authController.isAuthenticated,pasienteController.findAllPlans);
router.get('/buscarPas/:id',authController.isAuthenticated,pasienteController.findById);
router.post('/updatePas/:id',authController.isAuthenticated,pasienteController.update);
router.get('/borrarPas/:id',authController.isAuthenticated,pasienteController.delete);
router.get('/altaPas/:id',authController.isAuthenticated,pasienteController.altaPas);


//rutas concentracion
router.get('/atributos_med',authController.isAuthenticated,(req, res)=> {
      res.render('medicamento/atributosMed',{alert: false});
});
router.get('/buscar_conc',authController.isAuthenticated,concController.findAll);
router.post('/guardar_conc',authController.isAuthenticated,concController.create);
router.get('/borrar_conc/:id_conc',authController.isAuthenticated,concController.delete);
router.get('/buscarConc/:id',authController.isAuthenticated,concController.findById);
router.post('/updateConc/:id',authController.isAuthenticated,concController.update);
router.get('/buscar_conc0',authController.isAuthenticated,concController.findAll0);
router.get('/altaConc/:id',authController.isAuthenticated,concController.altaConc);

//rutas forma farmacologica

router.get('/buscar_form0',authController.isAuthenticated,formaController.findAll0);
router.get('/buscar_forma',authController.isAuthenticated,formaController.findAll);
router.get('/buscarForma/:id',authController.isAuthenticated,formaController.findById);
router.post('/guardar_form',authController.isAuthenticated,formaController.create);
router.get('/borrar_form/:id',authController.isAuthenticated,formaController.delete);
router.get('/buscarForm',authController.isAuthenticated,formaController.findById);
router.post('/updateForm/:id',authController.isAuthenticated,formaController.update);
router.get('/altaForm/:id',authController.isAuthenticated,formaController.altaForm);

//rutas familia

router.get('/buscar_fam0',authController.isAuthenticated,familiaController.findAll0);
router.get('/buscar_fam',authController.isAuthenticated,familiaController.findAll);
router.get('/buscarFam/:id',authController.isAuthenticated,familiaController.findById);
router.post('/guardar_fam',authController.isAuthenticated,familiaController.create);
router.get('/borrar_fam/:id',authController.isAuthenticated,familiaController.delete);
router.get('/buscarFam',authController.isAuthenticated,familiaController.findById);
router.post('/updateFam/:id',authController.isAuthenticated,familiaController.update);
router.get('/altaFam/:id',authController.isAuthenticated,familiaController.altaForm);

//rutas presentacion

router.get('/buscar_present0',authController.isAuthenticated,presentController.findAll0);
router.get('/buscar_present',authController.isAuthenticated,presentController.findAll);
router.get('/buscarPresent/:id',authController.isAuthenticated,presentController.findById);
router.post('/guardar_present',authController.isAuthenticated,presentController.create);
router.get('/borrar_present/:id',authController.isAuthenticated,presentController.delete);
router.get('/buscarPresent',authController.isAuthenticated,presentController.findById);
router.post('/updatePresent/:id',authController.isAuthenticated,presentController.update);
router.get('/altaPresent/:id',authController.isAuthenticated,presentController.alta);

//rutas medicamento

router.get('/crea_medicamento',authController.isAuthenticated,authController.esAdmin,(req, res)=> {
      res.render('medicamento/crear_medicamento',{alert: false});
});
router.get('/buscar_medica0',authController.isAuthenticated,medicamentoController.findAll0);
router.get('/buscar_medica',authController.isAuthenticated,medicamentoController.findAll);
router.get('/buscarMedica/:id',authController.isAuthenticated,medicamentoController.findById);
router.post('/guardar_medica',authController.isAuthenticated,medicamentoController.create);
router.get('/borrar_medica/:id',authController.isAuthenticated,medicamentoController.delete);
router.get('/buscarMedica',authController.isAuthenticated,medicamentoController.findById);
router.post('/updateMedica/:id',authController.isAuthenticated,medicamentoController.update);
router.get('/altaMedica/:id',authController.isAuthenticated,medicamentoController.alta);


//rutas especialidad

router.get('/buscar_espe0',authController.isAuthenticated,authController.esAdmin,espeController.findAll0);
router.get('/buscar_espe',authController.isAuthenticated,authController.esAdmin,espeController.findAll);
router.get('/buscarEspe/:id',authController.isAuthenticated,authController.esAdmin,espeController.findById);
router.post('/guardar_espe',authController.isAuthenticated,authController.esAdmin,espeController.create);
router.get('/borrar_espe/:id',authController.isAuthenticated,authController.esAdmin,espeController.delete);
router.get('/buscarEspe',authController.isAuthenticated,authController.esAdmin,espeController.findById);
router.post('/updateEspe/:id',authController.isAuthenticated,authController.esAdmin,espeController.update);
router.get('/altaEspe/:id',authController.isAuthenticated,authController.esAdmin,espeController.alta);
router.get('/especialidad',authController.isAuthenticated,authController.esAdmin, (req, res)=> {
      res.render('profesional/crear_especialidad',{alert: false} );
});

//rutas refeps

router.get('/buscar_refe0',authController.isAuthenticated,authController.esAdmin,refeController.findAll0);
router.get('/buscar_refe',authController.isAuthenticated,authController.esAdmin,refeController.findAll);
router.get('/buscarRefe/:id',authController.isAuthenticated,authController.esAdmin,refeController.findById);
router.post('/guardar_refe',authController.isAuthenticated,authController.esAdmin,refeController.create);
router.get('/borrar_refe/:id',authController.isAuthenticated,authController.esAdmin,refeController.delete);
router.get('/buscarRefe',authController.isAuthenticated,authController.esAdmin,refeController.findById);
router.post('/updateRefe/:id',authController.isAuthenticated,authController.esAdmin,refeController.update);
router.get('/altaRefe/:id',authController.isAuthenticated,authController.esAdmin,refeController.alta);
router.get('/refeps',authController.isAuthenticated,authController.esAdmin, (req, res)=> {
      res.render('profesional/crear_refeps',{alert: false} );
});



//rutas profesionales

router.get('/profesional',authController.isAuthenticated,authController.esAdmin, (req, res)=> {
      res.render('profesional/crear_profesional',{alert: false} );
});
router.get('/altaProf',authController.isAuthenticated,authController.esAdmin,(req, res)=> {
      res.render('profesional/altaProfBorrado',{alert: false});
});
router.get('/buscar_prof',authController.isAuthenticated,authController.esAdmin,profController.findAll);
router.get('/buscar_prof0',authController.isAuthenticated,authController.esAdmin,profController.findAll0);
router.get('/buscarProf/:id',authController.isAuthenticated,authController.esAdmin,profController.findById);
router.post('/guardar_prof',authController.isAuthenticated,authController.esAdmin,profController.create);
router.get('/BorrarProf/:id',authController.isAuthenticated,authController.esAdmin,profController.delete);
router.post('/updateProf/:id',authController.isAuthenticated,authController.esAdmin,profController.update);
router.get('/alta_Prof/:id',authController.isAuthenticated,authController.esAdmin,profController.alta);

module.exports = router;