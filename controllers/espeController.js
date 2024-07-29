const Especialidad = require('../models/Especialidad');

const espeController = {
    create: async (req, res) => {
        try {
            const { tipo_esp } = req.body;
            const ctrlRegex = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]+$/; // Se incluye \s para permitir espacios en blanco

            if (!tipo_esp || !ctrlRegex.test(tipo_esp)) {
                return res.render('profesional/crear_especialidad', {
                    alert: true,
                    alertTitle: "COLOQUE UN VALOR VALIDO",
                    alertMessage: "NO PUEDE ESTAR VACÍO Y DEBE CONTENER LETRAS, NÚMEROS O SÍMBOLOS",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'especialidad'
                });
            }




            await new Promise((resolve, reject) => {
                Especialidad.create(tipo_esp, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('profesional/crear_especialidad', {
                alert: true,
                alertTitle: "SE HA GUARDADO LA ESPECIALIDAD",
                alertMessage: "¡ESPECIALIDAD GUARDADA!",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'especialidad'
            });
        } catch (err) {
            console.error("Error al guardar especialidad:", err);
            res.status(500).send(err.message);
        }
    },

    findAll: async (req, res) => {
        try {
            const results = await new Promise((resolve, reject) => {
                Especialidad.findAll((err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });
            res.json(results);
        } catch (err) {
            console.error("Error al obtener todas las especialidades:", err);
            res.status(500).send(err.message);
        }
    },

    findAll0: async (req, res) => {
        try {
            const results = await new Promise((resolve, reject) => {
                Especialidad.findAll0((err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });
            res.json(results);
        } catch (err) {
            console.error("Error al obtener especialidades (findAll0):", err);
            res.status(500).send(err.message);
        }
    },

    findById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await new Promise((resolve, reject) => {
                Especialidad.findId(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });
            res.json({ data: result });
            console.log(result);
        } catch (err) {
            console.error("Error al obtener especialidad por ID:", err);
            res.status(500).send(err.message);
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const tipo_esp = req.body.especialidadEdit;
            const ctrlRegex = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]+$/; // Se incluye \s para permitir espacios en blanco

            if (!tipo_esp || !ctrlRegex.test(tipo_esp)) {
                return res.render('profesional/crear_especialidad', {
                    alert: true,
                    alertTitle: "COLOQUE UN VALOR VALIDO",
                    alertMessage: "NO PUEDE ESTAR VACÍO Y DEBE CONTENER LETRAS, NÚMEROS O SÍMBOLOS",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'especialidad'
                });
            }
            await new Promise((resolve, reject) => {
                Especialidad.update(id, tipo_esp, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('profesional/crear_especialidad', {
                alert: true,
                alertTitle: "SE HA ACTUALIZADO LA ESPECIALIDAD",
                alertMessage: "¡ESPECIALIDAD ACTUALIZADA!",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'especialidad'
            });
        } catch (err) {
            console.error("Error al actualizar especialidad:", err);
            res.status(500).send(err.message);
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                Especialidad.delete(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('profesional/crear_especialidad', {
                alert: true,
                alertTitle: "SE HA BORRADO LA ESPECIALIDAD",
                alertMessage: "¡ESPECIALIDAD BORRADA!",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 600,
                ruta: 'especialidad'
            });
        } catch (err) {
            console.error("Error al borrar especialidad:", err);
            res.status(500).send(err.message);
        }
    },

    alta: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                Especialidad.alta(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('profesional/crear_especialidad', {
                alert: true,
                alertTitle: "SE DIO ALTA A LA ESPECIALIDAD",
                alertMessage: "¡ALTA DE ESPECIALIDAD!",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'especialidad'
            });
        } catch (err) {
            console.error("Error al dar alta a la especialidad:", err);
            res.status(500).send(err.message);
        }
    }
};

module.exports = espeController;
