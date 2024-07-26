const Dosis = require('../models/Dosis');

const dosisController = {
    create: (req, res) => {
        const { dosis } = req.body;
        const todo = req.body;
        const ctrlRegex = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/;
        if (!dosis || !ctrlRegex.test(dosis)) {
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
       
        Dosis.create(dosis, (err, result) => {
            console.log(todo);
            if (err) {
                return res.status(500).send(err);
            }

            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE A GUARDADO DOSIS ",
                alertMessage: "DOSIS GUARDADA ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            })
        });
    },


    findAll: (req, res) => {
        Dosis.findAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findAll0: (req, res) => {
        Dosis.findAll0((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findById: (req, res) => {
        const { id } = req.params;
        Dosis.findId(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
           
            res.json({data:result});
            console.log(result); 
        });
    },
    update: (req, res) => {
        const { id } = req.params;
        const dosis  = req.body.dosisEdit;

        Dosis.update(id, dosis, (err, result) => {
            console.log('id2'+id);
            
            if (err) {
                return res.status(500).send(err);
            }
            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE A ACTUALIZADO DOSIS ",
                alertMessage: "DOSIS ACTUALIZADA ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            })
        });
    },

    delete: (req, res) => {
        const { id_dos } = req.params;
        Dosis.delete(id_dos, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('crear_reseta/atributosRes', {
                    alert: true,
                    alertTitle: "SE A BORRADO DOSIS ",
                    alertMessage: "DOSIS BORRADA ¡",
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
        Dosis.alta(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('crear_reseta/atributosRes', {
                    alert: true,
                    alertTitle: "SE DIO ALTA DOSIS ",
                    alertMessage: "ALTA DOSIS ¡",
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

module.exports = dosisController;