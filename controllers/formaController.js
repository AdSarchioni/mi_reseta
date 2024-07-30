const FormaFarma = require('../models/FormaFarma');

const formaController = {
    create: async (req, res) => {
        try {
            const { forma_fa } = req.body;
            const ctrlRegex = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]+$/; // Se incluye \s para permitir espacios en blanco

            if (!forma_fa || !ctrlRegex.test(forma_fa)) {
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
                FormaFarma.create(forma_fa, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE HA GUARDADO FORMA FARMACOLÓGICA",
                alertMessage: "FORMA FARMACOLÓGICA GUARDADA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            });
        } catch (err) {
            console.error("Error al guardar forma farmacológica:", err);
            res.status(500).send(err);
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const forma_fa = req.body.formaEdit;
            const ctrlRegex = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]+$/; // Se incluye \s para permitir espacios en blanco

            if (!forma_fa || !ctrlRegex.test(forma_fa)) {
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
                FormaFarma.update(id, forma_fa, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE HA ACTUALIZADO FORMA FARMACOLÓGICA",
                alertMessage: "FORMA FARMACOLÓGICA ACTUALIZADA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            });
        } catch (err) {
            console.error("Error al actualizar forma farmacológica:", err);
            res.status(500).send(err);
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                FormaFarma.delete(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE HA BORRADO FORMA FARMACOLÓGICA",
                alertMessage: "FORMA FARMACOLÓGICA BORRADA ¡",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 600,
                ruta: 'atributos_med'
            });
        } catch (err) {
            console.error("Error al borrar forma farmacológica:", err);
            res.status(500).send(err);
        }
    },

    altaForm: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                FormaFarma.altaForm(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE DIO ALTA A FORMA FARMACOLÓGICA",
                alertMessage: "ALTA FORMA FARMACOLÓGICA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            });
        } catch (err) {
            console.error("Error al dar alta a forma farmacológica:", err);
            res.status(500).send(err);
        }
    },

    // Métodos que no necesitan cambios
    findAll: (req, res) => {
        FormaFarma.findAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },

    findAll0: (req, res) => {
        FormaFarma.findAll0((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },

    findById: (req, res) => {
        const { id } = req.params;
        FormaFarma.findId(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
           
            res.json({ data: result });
            console.log(result); 
        });
    }
};

module.exports = formaController;
