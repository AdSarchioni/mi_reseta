const Familia = require('../models/Familia');

const familiaController = {
    create: (req, res) => {
        const { familia } = req.body;
        const ctrlRegex = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/;
        if (!familia || !ctrlRegex.test(familia)) {
            return res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "COLOQUE UN VALOR VALIDO",
                alertMessage: "NO PUEDE ESTAR VACÍO Y DEBE CONTENER LETRAS, NÚMEROS O SÍMBOLOS",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            });
        }
        Familia.create(familia, (err, result) => {
     
            if (err) {
                return res.status(500).send(err);
            }

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE A GUARDADO FAMILIA ",
                alertMessage: "FAMILIA GUARDADA ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            })
        });
    },


    findAll: (req, res) => {
        Familia.findAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findAll0: (req, res) => {
        Familia.findAll0((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findById: (req, res) => {
        const { id } = req.params;
        Familia.findId(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
           
            res.json({data:result});
            console.log(result); 
        });
    },
    update: (req, res) => {
        const { id } = req.params;
        const familia  = req.body.famEdit;

        Familia.update(id, familia, (err, result) => {
            console.log('id2'+id);
            
            if (err) {
                return res.status(500).send(err);
            }
            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE A ACTUALIZADO  FAMILIA ",
                alertMessage: "FAMILIA ACTUALIZADA ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            })
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        Familia.delete(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('medicamento/atributosMed', {
                    alert: true,
                    alertTitle: "SE A BORRADO FAMILIA ",
                    alertMessage: "FAMILIA BORRADA ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 600,
                    ruta: 'atributos_med'
                })
            }
        }
        );
    },
    altaForm: (req, res) => {
        const { id } = req.params;
        Familia.altaForm(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('medicamento/atributosMed', {
                    alert: true,
                    alertTitle: "SE DIO ALTA FAMILIA ",
                    alertMessage: "ALTA FAMILIA ¡",
                    alertIcon: 'access',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'atributos_med'
                })
            }
        }
        );
    }
};

module.exports = familiaController