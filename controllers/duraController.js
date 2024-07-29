const Duracion = require('../models/Duracion');

const duraController = {
    create: async (req, res) => {
        try {
            const { duracion } = req.body;
            const ctrlRegex = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]+$/; // Se incluye \s para permitir espacios en blanco

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

            await new Promise((resolve, reject) => {
                Duracion.create(duracion, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE HA GUARDADO DURACIÓN",
                alertMessage: "DURACIÓN GUARDADA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            });
        } catch (err) {
            console.error("Error al crear duración:", err);
            res.status(500).send(err);
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const duracion = req.body.duraEdit;

            await new Promise((resolve, reject) => {
                Duracion.update(id, duracion, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE HA ACTUALIZADO DURACIÓN",
                alertMessage: "DURACIÓN ACTUALIZADA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            });
        } catch (err) {
            console.error("Error al actualizar duración:", err);
            res.status(500).send(err);
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                Duracion.delete(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE HA BORRADO DURACIÓN",
                alertMessage: "DURACIÓN BORRADA ¡",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 600,
                ruta: 'atributos_admin'
            });
        } catch (err) {
            console.error("Error al eliminar duración:", err);
            res.status(500).send(err);
        }
    },

    alta: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                Duracion.alta(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE DIO ALTA A DURACIÓN",
                alertMessage: "ALTA DURACIÓN ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            });
        } catch (err) {
            console.error("Error al dar alta a duración:", err);
            res.status(500).send(err);
        }
    },

    // Métodos que no necesitan cambios
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
           
            res.json({ data: result });
            console.log(result); 
        });
    }
};

module.exports = duraController;
