const Duracion = require('../models/Duracion');

const duraController = {
    create: (req, res) => {
        const { duracion } = req.body;
       
        const ctrlRegex = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/;
        if (!duracion || !ctrlRegex.test(duracion)) {
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


        Duracion.crea
        te(duracion, (err, result) => {
     
            if (err) {
                return res.status(500).send(err);
            }

            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE A GUARDADO DURACION ",
                alertMessage: "DURACION GUARDADA ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            })
        });
    },


    findAll: (req, res) => {
        Duracion.findAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findAll0: (req, res) => {
        Duracion.findAll0((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findById: (req, res) => {
        const { id } = req.params;
        Duracion.findId(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
           
            res.json({data:result});
            console.log(result); 
        });
    },
    update: (req, res) => {
        const { id } = req.params;
        const duracion = req.body.duraEdit;

        Duracion.update(id, duracion, (err, result) => {
            console.log('id2'+id);
            
            if (err) {
                return res.status(500).send(err);
            }
            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE A ACTUALIZADO DURACION ",
                alertMessage: "DURACION ACTUALIZADA ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            })
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        Duracion.delete(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('crear_reseta/atributosRes', {
                    alert: true,
                    alertTitle: "SE A BORRADO DURACION ",
                    alertMessage: "DURACION BORRADA ¡",
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
        Duracion.alta(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('crear_reseta/atributosRes', {
                    alert: true,
                    alertTitle: "SE DIO ALTA DURACION ",
                    alertMessage: "ALTA DURACION ¡",
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

module.exports = duraController