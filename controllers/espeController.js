const Especialidad = require('../models/Especialidad');

const espeController = {
    create: (req, res) => {
        const { tipo_esp } = req.body;
    
        Especialidad.create(tipo_esp, (err, result) => {
     
            if (err) {
                return res.status(500).send(err);
            }

            res.render('profesional/crear_especialidad', {
                alert: true,
                alertTitle: "SE A GUARDADO ESPECIALIDAD ",
                alertMessage: "ESPECIALIDAD GUARDADA ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'especialidad'
            })
        });
    },


    findAll: (req, res) => {
        Especialidad.findAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findAll0: (req, res) => {
        Especialidad.findAll0((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findById: (req, res) => {
        const { id } = req.params;
        Especialidad.findId(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
           
            res.json({data:result});
            console.log(result); 
        });
    },
    update: (req, res) => {
        const { id } = req.params;
        const tipo_esp  = req.body.especialidadEdit;

        Especialidad.update(id, tipo_esp, (err, result) => {
            console.log('id2'+id);
            
            if (err) {
                return res.status(500).send(err);
            }
            res.render('profesional/crear_especialidad', {
                alert: true,
                alertTitle: "SE A ACTUALIZADO ESPECIALIDAD ",
                alertMessage: "ESPECIALIDAD ACTUALIZADA ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'especialidad'
            })
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        Especialidad.delete(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('profesional/crear_especialidad', {
                    alert: true,
                    alertTitle: "SE A BORRADO ESPECIALIDAD ",
                    alertMessage: "ESPECIALIDAD BORRADA ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 600,
                    ruta: 'especialidad'
                })
            }
        }
        );
    },
    alta: (req, res) => {
        const { id } = req.params;
        Especialidad.alta(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('profesional/crear_especialidad', {
                    alert: true,
                    alertTitle: "SE DIO ALTA ESPECIALIDAD ",
                    alertMessage: "ALTA ESPECIALIDAD ¡",
                    alertIcon: 'access',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'especialidad'
                })
            }
        }
        );
    }
};

module.exports = espeController;