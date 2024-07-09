const Presentacion = require('../models/Presentacion');

const presentController = {
    create: (req, res) => {
        const { presentacion } = req.body;
    
        Presentacion.create(presentacion, (err, result) => {
     
            if (err) {
                return res.status(500).send(err);
            }

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE A GUARDADO PRESENTACION ",
                alertMessage: "PRESENTACION GUARDADA ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            })
        });
    },


    findAll: (req, res) => {
        Presentacion.findAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findAll0: (req, res) => {
        Presentacion.findAll0((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findById: (req, res) => {
        const { id } = req.params;
        Presentacion.findId(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
           
            res.json({data:result});
            console.log(result); 
        });
    },
    update: (req, res) => {
        const { id } = req.params;
        const presentacion  = req.body.presentEdit;

        Presentacion.update(id, presentacion, (err, result) => {
         
            
            if (err) {
                return res.status(500).send(err);
            }
            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE A ACTUALIZADO PRESENTACION ",
                alertMessage: "PRESENTACION ACTUALIZADA ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            })
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        Presentacion.delete(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('medicamento/atributosMed', {
                    alert: true,
                    alertTitle: "SE A BORRADO PRESENTACION ",
                    alertMessage: "PRESENTACION BORRADA ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 600,
                    ruta: 'atributos_med'
                })
            }
        }
        );
    },
    alta: (req, res) => {
        const { id } = req.params;
        Presentacion.alta(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('medicamento/atributosMed', {
                    alert: true,
                    alertTitle: "SE DIO ALTA PRESENTACION ",
                    alertMessage: "ALTA PRESETACION ¡",
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

module.exports = presentController;