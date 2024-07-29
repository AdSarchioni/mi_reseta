const Cantidad = require('../models/Cantidad');

const cantController = {
    create: async (req, res) => {
        const { cantidad } = req.body;
        const ctrlRegex = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]+$/; // Se incluye \s para permitir espacios en blanco
        
        if (!cantidad || !ctrlRegex.test(cantidad)) {
            return res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "COLOQUE UN VALOR VALIDO",
                alertMessage: "NO PUEDE ESTAR VACÍO Y DEBE CONTENER LETRAS, NÚMEROS O SÍMBOLOS",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            });
        }
        
        try {
            await Cantidad.create(cantidad);
            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE HA GUARDADO CANTIDAD",
                alertMessage: "CANTIDAD GUARDADA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            });
        } catch (err) {
            res.status(500).send(err);
        }
    },
    findAll: (req, res) => {
        Cantidad.findAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findAll0: (req, res) => {
        Cantidad.findAll0((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findById: (req, res) => {
        const { id } = req.params;
        Cantidad.findId(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
           
            res.json({data:result});
            console.log(result); 
        });
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { cantEdit: cantidad } = req.body;

        try {
            await Cantidad.update(id, cantidad);
            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE HA ACTUALIZADO CANTIDAD",
                alertMessage: "CANTIDAD ACTUALIZADA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        
        try {
            await Cantidad.delete(id);
            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE HA BORRADO CANTIDAD",
                alertMessage: "CANTIDAD BORRADA ¡",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 600,
                ruta: 'atributos_admin'
            });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    alta: async (req, res) => {
        const { id } = req.params;
        
        try {
            await Cantidad.alta(id);
            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE DIO ALTA CANTIDAD",
                alertMessage: "ALTA CANTIDAD ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            });
        } catch (err) {
            res.status(500).send(err);
        }
    }
};

module.exports = cantController;
