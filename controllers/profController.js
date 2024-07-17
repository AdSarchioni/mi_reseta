const Profesional = require('../models/Profesional');
const { findById } = require('./pasienteController');

const profController = {
    create: (req, res) => {
        const {
            id_refer, id_especialidad, matricula, nombre_prof,
            apellido_prof, dni_prof, domicilio_prof, mail_prof, tel_prof
        } = req.body;
        
        // Validar que el DNI no esté vacío y que contenga solo números
        const dniRegex = /^[0-9]+$/;
        if (!dni_prof || !dniRegex.test(dni_prof)) {
            return res.render('profesional/crear_profesional', {
                alert: true,
                alertTitle: "COLOQUE UN NUMERO VALIDO",
                alertMessage: "DNI DISTINTO VALOR ¡",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 800,
                ruta: 'profesional'
            });
        }
    
        Profesional.findByMatri(matricula, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                return res.render('profesional/crear_profesional', {
                    alert: true,
                    alertTitle: "ERROR LA MATRICULA  YA EXISTE",
                    alertMessage: "MATRICULA REPETIDO ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'profesional'
                });
            }
    
            Profesional.findByRefeps(id_refer, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                if (result.length > 0) {
                    return res.render('profesional/crear_profesional', {
                        alert: true,
                        alertTitle: "ERROR EL REFEPS YA EXISTE",
                        alertMessage: "REFEPS REPETIDO ¡",
                        alertIcon: 'error',
                        showConfirmButton: false,
                        timer: 800,
                        ruta: 'profesional'
                    });
                }
    
                Profesional.create(
                    id_refer, id_especialidad, matricula, nombre_prof, apellido_prof,
                    dni_prof, domicilio_prof, mail_prof, tel_prof, (err) => {
                        if (err) {
                            return res.status(500).send(err.message);
                        }
    
                        res.render('profesional/crear_profesional', {
                            alert: true,
                            alertTitle: "SE HA CREADO EL PROFESIONAL",
                            alertMessage: "¡PROFESIONAL CREADO!",
                            alertIcon: 'success',
                            showConfirmButton: false,
                            timer: 800,
                            ruta: 'profesional'
                        });
                    }
                );
            });
        });
    }
     
    ,

    findAll: (req, res) => {
        Profesional.findAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findAll0: (req, res) => {
        Profesional.findAll0((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findById: (req, res) => {
        const { id } = req.params;
        Profesional.findById(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            res.json({ data: result });
            console.log(result);
        });
    },
    findByMatri: (req, res) => {
        const { matricula } = req.params;
        Profesional.findByMatri(matricula, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            res.json({ data: result });
            console.log(result);
        });
    },
    findByRefeps: (req, res) => {
        const {refeps} = req.params;
        Profesional.findByRefeps(refeps, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            res.json({ data: result });
            console.log(result);
        });
    },

    update: (req, res) => {
        const { id } = req.params;
        const id_prof = id;
        const {
            id_refer, id_especialidad, matricula, nombre_prof,
            apellido_prof, dni_prof, domicilio_prof, mail_prof, tel_prof
        } = req.body;
        
        // Validar que el DNI no esté vacío y que contenga solo números
        const dniRegex = /^[0-9]+$/;
        if (!dni_prof || !dniRegex.test(dni_prof)) {
            return res.render('profesional/crear_profesional', {
                alert: true,
                alertTitle: "COLOQUE UN NUMERO VALIDO",
                alertMessage: "DNI DISTINTO VALOR ¡",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 800,
                ruta: 'profesional'
            });
        }
    
        Profesional.findByMatriU(matricula,id_prof, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                return res.render('profesional/crear_profesional', {
                    alert: true,
                    alertTitle: "ERROR LA MATRICULA  YA EXISTE",
                    alertMessage: "MATRICULA REPETIDO ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'profesional'
                });
            }
    
            Profesional.findByRefepsU(id_refer,id_prof, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                if (result.length > 0) {
                    return res.render('profesional/crear_profesional', {
                        alert: true,
                        alertTitle: "ERROR EL REFEPS YA EXISTE",
                        alertMessage: "REFEPS REPETIDO ¡",
                        alertIcon: 'error',
                        showConfirmButton: false,
                        timer: 800,
                        ruta: 'profesional'
                    });
                }
    
                Profesional.update(
                  id_prof,  id_refer, id_especialidad, matricula, nombre_prof, apellido_prof,
                    dni_prof, domicilio_prof, mail_prof, tel_prof, (err) => {
                        if (err) {
                            return res.status(500).send(err.message);
                        }
    
                        res.render('profesional/crear_profesional', {
                            alert: true,
                            alertTitle: "SE HA ACTUALIZADO EL PROFESIONAL",
                            alertMessage: "¡PROFESIONAL ACTUALIZADO!",
                            alertIcon: 'success',
                            showConfirmButton: false,
                            timer: 800,
                            ruta: 'profesional'
                        });
                    }
                );
            });
        });
    },
    delete: (req, res) => {
        const { id } = req.params;
        Profesional.delete(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('profesional/crear_profesional', {
                    alert: true,
                    alertTitle: "SE A BORRADO EL PROFESIONAL ",
                    alertMessage: "PROFESIONAL BORRADO ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 600,
                    ruta: 'profesional'
                })
            }
        }
        );
    },
    alta: (req, res) => {
        const { id } = req.params;
        Profesional.alta(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('profesional/crear_profesional', {
                    alert: true,
                    alertTitle: "SE DIO ALTA AL PROFESIONAL ",
                    alertMessage: "PROFESIONAL ALTA",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 600,
                    ruta: 'profesional'
                })
            }
        }
        );
    }
};

module.exports = profController;