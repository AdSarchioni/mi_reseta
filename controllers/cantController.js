const Cantidad = require('../models/Cantidad');

const cantController = {
    create: (req, res) => {
        const { cantidad } = req.body;
        const ctrlRegex = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/;
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
        
        Cantidad.create(cantidad, (err, result) => {
     
            if (err) {
                return res.status(500).send(err);
            }

            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE A GUARDADO CANTIDAD ",
                alertMessage: "CANTIDAD GUARDADA ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            })
        });
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
    update: (req, res) => {
        const { id } = req.params;
        const cantidad  = req.body.cantEdit;

        Cantidad.update(id, cantidad, (err, result) => {
         
            
            if (err) {
                return res.status(500).send(err);
            }
            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE A ACTUALIZADO CANTIDAD ",
                alertMessage: "CANTIDAD ACTUALIZADA ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            })
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        Cantidad.delete(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('crear_reseta/atributosRes', {
                    alert: true,
                    alertTitle: "SE A BORRADO CANTIDAD ",
                    alertMessage: "CANTIDAD BORRADA ¡",
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
        Cantidad.alta(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('crear_reseta/atributosRes', {
                    alert: true,
                    alertTitle: "SE DIO ALTA CANTIDAD ",
                    alertMessage: "ALTA CANTIDAD ¡",
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

module.exports = cantController;