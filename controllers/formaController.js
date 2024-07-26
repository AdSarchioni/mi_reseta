const FormaFarma = require('../models/FormaFarma');

const formaController = {
    create: (req, res) => {
        const { forma_fa } = req.body;
        const todo = req.body;
        const ctrlRegex = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/;
        if (!forma_fa || !ctrlRegex.test(forma_fa)) {
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

        FormaFarma.create(forma_fa, (err, result) => {
            console.log(todo);
            if (err) {
                return res.status(500).send(err);
            }

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE A GUARDADO FORMA FARMACOLOGICA ",
                alertMessage: "FORMA FARMACOLOGICA GUARDADA ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            })
        });
    },


    findAll: (req, res) => {
        FormaFarma.findAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findAll0: (req, res) => {
        FormaFarma.findAll0((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findById: (req, res) => {
        const { id } = req.params;
        FormaFarma.findId(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
           
            res.json({data:result});
            console.log(result); 
        });
    },
    update: (req, res) => {
        const { id } = req.params;
        const forma_fa  = req.body.formaEdit;

        FormaFarma.update(id, forma_fa, (err, result) => {
            console.log('id2'+id);
            
            if (err) {
                return res.status(500).send(err);
            }
            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE A ACTUALIZADO FORMA FARMACOLOGICA ",
                alertMessage: "FORMA FARMACOLOGICA ACTUALIZADA ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            })
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        FormaFarma.delete(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('medicamento/atributosMed', {
                    alert: true,
                    alertTitle: "SE A BORRADO FORMA FARMACOLOGICA ",
                    alertMessage: "FORMA FARMACOLOGICA BORRADA ¡",
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
        FormaFarma.altaForm(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('medicamento/atributosMed', {
                    alert: true,
                    alertTitle: "SE DIO ALTA FORMA FARMACOLOGICA ",
                    alertMessage: "ALTA FORMA FARMACOLOGICA ¡",
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

module.exports = formaController;