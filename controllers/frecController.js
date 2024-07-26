const Frecuencia = require('../models/Frecuencia');

const frecController = {
    create: (req, res) => {
        const { frecuencia } = req.body;
        const todo = req.body;
        const ctrlRegex = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/;
        if (!frecuencia || !ctrlRegex.test(frecuencia)) {
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
        Frecuencia.create(frecuencia, (err, result) => {
            console.log(todo);
            if (err) {
                return res.status(500).send(err);
            }

            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE A GUARDADO FRECUENCIA ",
                alertMessage: "FRECUENCIA GUARDADA ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            })
        });
    },


    findAll: (req, res) => {
        Frecuencia.findAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findAll0: (req, res) => {
        Frecuencia.findAll0((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findById: (req, res) => {
        const { id } = req.params;
        Frecuencia.findId(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
           
            res.json({data:result});
            console.log(result); 
        });
    },
    update: (req, res) => {
        const { id } = req.params;
        const frecuencia  = req.body.frecuenciaEdit;

        Frecuencia.update(id, frecuencia, (err, result) => {
            console.log('id2'+id);
            
            if (err) {
                return res.status(500).send(err);
            }
            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE A ACTUALIZADO FRECUENCIA ",
                alertMessage: "FRECUENCIA ACTUALIZADA ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            })
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        Frecuencia.delete(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('crear_reseta/atributosRes', {
                    alert: true,
                    alertTitle: "SE A BORRADO FRECUENCIA ",
                    alertMessage: "FRECUENCIA BORRADA ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 600,
                    ruta: 'atributos_admin'
                })
            }
        }
        );
    },
    alta: (req, res) => {
        const { id } = req.params;
        Frecuencia .alta(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('crear_reseta/atributosRes', {
                    alert: true,
                    alertTitle: "SE DIO ALTA FRECUENCIA ",
                    alertMessage: "ALTA FRECUENCIA ¡",
                    alertIcon: 'access',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'atributos_admin'
                })
            }
        }
        );
    }
};

module.exports = frecController;