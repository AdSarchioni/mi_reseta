const Refeps = require('../models/Refeps');

const refeController = {
    create: async (req, res) => {
        try {
            const { numero } = req.body;
            const ctrlRegex = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]+$/; // Permite letras, números, espacios y símbolos

            if (!numero || !ctrlRegex.test(numero)) {
                return res.render('profesional/crear_refeps', {
                    alert: true,
                    alertTitle: "COLOQUE UN VALOR VÁLIDO",
                    alertMessage: "NO PUEDE ESTAR VACÍO Y DEBE CONTENER LETRAS, NÚMEROS O SÍMBOLOS",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'refeps'
                });
            }

            // Verificar si el número ya existe en la base de datos
            const exists = await new Promise((resolve, reject) => {
                Refeps.exists(numero, (err, exists) => {
                    if (err) return reject(err);
                    resolve(exists);
                });
            });

            if (exists) {
                return res.render('profesional/crear_refeps', {
                    alert: true,
                    alertTitle: "REFEPS YA EXISTE",
                    alertMessage: "DEBE COLOCAR OTRO REFEPS",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'refeps'
                });
            }

            // Crear la nueva entrada si el número no existe
            await new Promise((resolve, reject) => {
                Refeps.create(numero, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('profesional/crear_refeps', {
                alert: true,
                alertTitle: "SE HA GUARDADO REFEPS",
                alertMessage: "REFEPS GUARDADA",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'refeps'
            });
        } catch (err) {
            console.error("Error al guardar REFEPS:", err);
            res.status(500).send(err.message);
        }
    },

    findAll: async (req, res) => {
        try {
            const results = await new Promise((resolve, reject) => {
                Refeps.findAll((err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });
            res.json(results);
        } catch (err) {
            console.error("Error al obtener todos los REFEPS:", err);
            res.status(500).send(err.message);
        }
    },

    findAll0: async (req, res) => {
        try {
            const results = await new Promise((resolve, reject) => {
                Refeps.findAll0((err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });
            res.json(results);
        } catch (err) {
            console.error("Error al obtener REFEPS (findAll0):", err);
            res.status(500).send(err.message);
        }
    },

    findById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await new Promise((resolve, reject) => {
                Refeps.findId(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });
            res.json({ data: result });
            console.log(result);
        } catch (err) {
            console.error("Error al obtener REFEPS por ID:", err);
            res.status(500).send(err.message);
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const numero = req.body.numEdit;
            const ctrlRegex = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]+$/; // Permite letras, números, espacios y símbolos

            if (!numero || !ctrlRegex.test(numero)) {
                return res.render('profesional/crear_refeps', {
                    alert: true,
                    alertTitle: "COLOQUE UN VALOR VÁLIDO",
                    alertMessage: "NO PUEDE ESTAR VACÍO Y DEBE CONTENER LETRAS, NÚMEROS O SÍMBOLOS",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'refeps'
                });
            }
            // Verificar si el número ya existe en la base de datos
            const exists = await new Promise((resolve, reject) => {
                Refeps.exists(numero, (err, exists) => {
                    if (err) return reject(err);
                    resolve(exists);
                });
            });

            if (exists) {
                return res.render('profesional/crear_refeps', {
                    alert: true,
                    alertTitle: "REFEPS YA EXISTE",
                    alertMessage: "DEBE COLOCAR OTRO REFEPS",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'refeps'
                });
            }


            await new Promise((resolve, reject) => {
                Refeps.update(id, numero, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('profesional/crear_refeps', {
                alert: true,
                alertTitle: "SE HA ACTUALIZADO REFEPS",
                alertMessage: "REFEPS ACTUALIZADA",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'refeps'
            });
        } catch (err) {
            console.error("Error al actualizar REFEPS:", err);
            res.status(500).send(err.message);
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                Refeps.delete(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('profesional/crear_refeps', {
                alert: true,
                alertTitle: "SE HA BORRADO REFEPS",
                alertMessage: "REFEPS BORRADA",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 600,
                ruta: 'refeps'
            });
        } catch (err) {
            console.error("Error al borrar REFEPS:", err);
            res.status(500).send(err.message);
        }
    },

    alta: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                Refeps.alta(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('profesional/crear_refeps', {
                alert: true,
                alertTitle: "SE DIO ALTA A REFEPS",
                alertMessage: "ALTA REFEPS",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'refeps'
            });
        } catch (err) {
            console.error("Error al dar alta a REFEPS:", err);
            res.status(500).send(err.message);
        }
    }
};

module.exports = refeController;
