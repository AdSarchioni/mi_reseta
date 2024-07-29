const Frecuencia = require('../models/Frecuencia');

const frecController = {
    create: async (req, res) => {
        try {
            const { frecuencia } = req.body;
            const ctrlRegex = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]+$/; // Se incluye \s para permitir espacios en blanco

            if (!frecuencia || !ctrlRegex.test(frecuencia)) {
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

            await new Promise((resolve, reject) => {
                Frecuencia.create(frecuencia, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE HA GUARDADO FRECUENCIA",
                alertMessage: "FRECUENCIA GUARDADA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            });
        } catch (err) {
            console.error("Error al crear frecuencia:", err);
            res.status(500).send(err);
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { frecuenciaEdit: frecuencia } = req.body;

            await new Promise((resolve, reject) => {
                Frecuencia.update(id, frecuencia, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE HA ACTUALIZADO FRECUENCIA",
                alertMessage: "FRECUENCIA ACTUALIZADA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            });
        } catch (err) {
            console.error("Error al actualizar frecuencia:", err);
            res.status(500).send(err);
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                Frecuencia.delete(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE HA BORRADO FRECUENCIA",
                alertMessage: "FRECUENCIA BORRADA ¡",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 600,
                ruta: 'atributos_admin'
            });
        } catch (err) {
            console.error("Error al eliminar frecuencia:", err);
            res.status(500).send(err);
        }
    },

    alta: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                Frecuencia.alta(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE DIO ALTA A FRECUENCIA",
                alertMessage: "ALTA FRECUENCIA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            });
        } catch (err) {
            console.error("Error al dar alta a frecuencia:", err);
            res.status(500).send(err);
        }
    },

    // Métodos que no necesitan cambios
    findAll: (req, res) => {
        Frecuencia.findAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },

    findAll0: (req, res) => {
        Frecuencia.findAll0((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },

    findById: (req, res) => {
        const { id } = req.params;
        Frecuencia.findId(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
           
            res.json({ data: result });
            console.log(result); 
        });
    }
};

module.exports = frecController;
