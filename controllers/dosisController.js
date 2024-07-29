const Dosis = require('../models/Dosis');

const dosisController = {
    create: async (req, res) => {
        try {
            const { dosis } = req.body;
            const ctrlRegex = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]+$/; // Se incluye \s para permitir espacios en blanco

            if (!dosis || !ctrlRegex.test(dosis)) {
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
                Dosis.create(dosis, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE HA GUARDADO DOSIS",
                alertMessage: "DOSIS GUARDADA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            });
        } catch (err) {
            console.error("Error al crear dosis:", err);
            res.status(500).send(err);
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { dosisEdit: dosis } = req.body;

            await new Promise((resolve, reject) => {
                Dosis.update(id, dosis, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE HA ACTUALIZADO DOSIS",
                alertMessage: "DOSIS ACTUALIZADA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            });
        } catch (err) {
            console.error("Error al actualizar dosis:", err);
            res.status(500).send(err);
        }
    },

    delete: async (req, res) => {
        try {
            const { id_dos } = req.params;

            await new Promise((resolve, reject) => {
                Dosis.delete(id_dos, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE HA BORRADO DOSIS",
                alertMessage: "DOSIS BORRADA ¡",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 600,
                ruta: 'atributos_admin'
            });
        } catch (err) {
            console.error("Error al eliminar dosis:", err);
            res.status(500).send(err);
        }
    },

    alta: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                Dosis.alta(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('crear_reseta/atributosRes', {
                alert: true,
                alertTitle: "SE DIO ALTA A DOSIS",
                alertMessage: "ALTA DOSIS ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_admin'
            });
        } catch (err) {
            console.error("Error al dar alta a dosis:", err);
            res.status(500).send(err);
        }
    },

    // Métodos que no necesitan cambios
    findAll: (req, res) => {
        Dosis.findAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },

    findAll0: (req, res) => {
        Dosis.findAll0((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },

    findById: (req, res) => {
        const { id } = req.params;
        Dosis.findId(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
           
            res.json({ data: result });
            console.log(result); 
        });
    }
};

module.exports = dosisController;

