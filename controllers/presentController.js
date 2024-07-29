const Presentacion = require('../models/Presentacion');

const presentController = {
    create: async (req, res) => {
        try {
            const { presentacion } = req.body;
            const ctrlRegex = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]+$/; // Se incluye \s para permitir espacios en blanco

            if (!presentacion || !ctrlRegex.test(presentacion)) {
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

            await new Promise((resolve, reject) => {
                Presentacion.create(presentacion, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE HA GUARDADO PRESENTACIÓN",
                alertMessage: "PRESENTACIÓN GUARDADA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            });
        } catch (err) {
            console.error("Error al guardar presentación:", err);
            res.status(500).send(err);
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const presentacion = req.body.presentEdit;

            await new Promise((resolve, reject) => {
                Presentacion.update(id, presentacion, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE HA ACTUALIZADO PRESENTACIÓN",
                alertMessage: "PRESENTACIÓN ACTUALIZADA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            });
        } catch (err) {
            console.error("Error al actualizar presentación:", err);
            res.status(500).send(err);
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                Presentacion.delete(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE HA BORRADO PRESENTACIÓN",
                alertMessage: "PRESENTACIÓN BORRADA ¡",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 600,
                ruta: 'atributos_med'
            });
        } catch (err) {
            console.error("Error al borrar presentación:", err);
            res.status(500).send(err);
        }
    },

    alta: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                Presentacion.alta(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE DIO ALTA A PRESENTACIÓN",
                alertMessage: "ALTA PRESENTACIÓN ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            });
        } catch (err) {
            console.error("Error al dar alta a presentación:", err);
            res.status(500).send(err);
        }
    },

    // Métodos que no necesitan cambios
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
           
            res.json({ data: result });
            console.log(result); 
        });
    }
};

module.exports = presentController;
