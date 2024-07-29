const Familia = require('../models/Familia');

const familiaController = {
    create: async (req, res) => {
        try {
            const { familia } = req.body;
            const ctrlRegex = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]+$/;

            if (!familia || !ctrlRegex.test(familia)) {
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
                Familia.create(familia, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE HA GUARDADO FAMILIA",
                alertMessage: "FAMILIA GUARDADA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            });
        } catch (err) {
            console.error("Error al guardar familia:", err);
            res.status(500).send(err);
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const familia = req.body.famEdit;

            await new Promise((resolve, reject) => {
                Familia.update(id, familia, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE HA ACTUALIZADO FAMILIA",
                alertMessage: "FAMILIA ACTUALIZADA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            });
        } catch (err) {
            console.error("Error al actualizar familia:", err);
            res.status(500).send(err);
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                Familia.delete(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE HA BORRADO FAMILIA",
                alertMessage: "FAMILIA BORRADA ¡",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 600,
                ruta: 'atributos_med'
            });
        } catch (err) {
            console.error("Error al borrar familia:", err);
            res.status(500).send(err);
        }
    },

    altaForm: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                Familia.altaForm(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE DIO ALTA A FAMILIA",
                alertMessage: "ALTA FAMILIA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            });
        } catch (err) {
            console.error("Error al dar alta a familia:", err);
            res.status(500).send(err);
        }
    },

    // Métodos que no necesitan cambios
    findAll: (req, res) => {
        Familia.findAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },

    findAll0: (req, res) => {
        Familia.findAll0((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },

    findById: (req, res) => {
        const { id } = req.params;
        Familia.findId(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
           
            res.json({ data: result });
            console.log(result); 
        });
    }
};

module.exports = familiaController;
