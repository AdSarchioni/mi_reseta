const Refeps = require('../models/Refeps');

const refeController = {
    create: (req, res) => {
        const { numero } = req.body;
    
        Refeps.create(numero, (err, result) => {
     
            if (err) {
                return res.status(500).send(err);
            }

            res.render('profesional/crear_refeps', {
                alert: true,
                alertTitle: "SE A GUARDADO REFEPS ",
                alertMessage: "REFEPS GUARDADA ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'refeps'
            })
        });
    },


    findAll: (req, res) => {
        Refeps.findAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findAll0: (req, res) => {
        Refeps.findAll0((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findById: (req, res) => {
        const { id } = req.params;
        Refeps.findId(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
           
            res.json({data:result});
            console.log(result); 
        });
    },
    update: (req, res) => {
        const { id } = req.params;
        const numero  = req.body.numEdit;

        Refeps.update(id, numero, (err, result) => {
       
            
            if (err) {
                return res.status(500).send(err);
            }
            res.render('profesional/crear_refeps', {
                alert: true,
                alertTitle: "SE A ACTUALIZADO REFEPS ",
                alertMessage: "REFEPS ACTUALIZADA ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'refeps'
            })
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        Refeps.delete(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('profesional/crear_refeps', {
                    alert: true,
                    alertTitle: "SE A BORRADO REFEPS ",
                    alertMessage: "REFEPS BORRADA ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 600,
                    ruta: 'refeps'
                })
            }
        }
        );
    },
    alta: (req, res) => {
        const { id } = req.params;
        Refeps.alta(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('profesional/crear_refeps', {
                    alert: true,
                    alertTitle: "SE DIO ALTA REFEPS ",
                    alertMessage: "ALTA REFEPS ¡",
                    alertIcon: 'access',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'refeps'
                })
            }
        }
        );
    }
};

module.exports = refeController;