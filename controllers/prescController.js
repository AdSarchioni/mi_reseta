const Prescripcion = require('../models/Prescripcion');

const prescController = {
    create: (req, res) => {
        const { familia } = req.body;
    
        Prescripcion.create(familia, (err, result) => {
     
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
        Prescripcion.findAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findAll0: (req, res) => {
        Prescripcion.findAll0((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findById: (req, res) => {
        const { id } = req.params;
        Prescripcion.findId(id, (err, result) => {
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

        Prescripcion.update(id, familia, (err, result) => {
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
        Prescripcion.delete(id, (err, result) => {
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
    alta: (req, res) => {
        const { id } = req.params;
        Prescripcion.altaForm(id, (err, result) => {
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

module.exports = prescController;