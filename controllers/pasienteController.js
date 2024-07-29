const Pasiente = require('../models/Pasiente');

const pasienteController = {
    create: async (req, res) => {
        try {
            const { nombre, apellido, dni, fecha_nac, sexo, alta, id_plan } = req.body;

            // Verificar si alguno de los valores requeridos está vacío
            if (!nombre || !apellido || !dni || !fecha_nac || !sexo || !alta || !id_plan) {
                return res.render('pasiente/crear_pasiente', {
                    alert: true,
                    alertTitle: "DATOS INCOMPLETOS",
                    alertMessage: "FALTAN VALORES O VALORES INCORRECTOS ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'crea_pasiente'
                });
            }

            // Validar que el DNI no esté vacío y que contenga solo números
            const dniRegex = /^[0-9]+$/;
            if (!dni || !dniRegex.test(dni)) {
                return res.render('pasiente/crear_pasiente', {
                    alert: true,
                    alertTitle: "COLOQUE UN NÚMERO VÁLIDO",
                    alertMessage: "DNI DISTINTO VALOR ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'crea_pasiente'
                });
            }

            const results = await new Promise((resolve, reject) => {
                Pasiente.findByDni(dni, (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });

            if (results.length > 0) {
                return res.render('pasiente/crear_pasiente', {
                    alert: true,
                    alertTitle: "ERROR EL DNI YA EXISTE",
                    alertMessage: "DNI REPETIDO ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'crea_pasiente'
                });
            } else {
                await new Promise((resolve, reject) => {
                    Pasiente.create(nombre, apellido, dni, fecha_nac, sexo, alta, id_plan, (err, result) => {
                        if (err) return reject(err);
                        resolve(result);
                    });
                });

                res.render('pasiente/crear_pasiente', {
                    alert: true,
                    alertTitle: "SE HA GUARDADO EL PASIENTE",
                    alertMessage: "PACIENTE GUARDADO ¡",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'crea_pasiente'
                });
            }
        } catch (err) {
            console.error("Error al crear paciente:", err);
            res.status(500).send(err.message);
        }
    },

    findAll: async (req, res) => {
        try {
            const results = await new Promise((resolve, reject) => {
                Pasiente.findAll((err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });

            res.json(results);
        } catch (err) {
            console.error("Error al obtener todos los pacientes:", err);
            res.status(500).send(err.message);
        }
    },

    findAll0: async (req, res) => {
        try {
            const results = await new Promise((resolve, reject) => {
                Pasiente.findAll0((err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });

            res.json(results);
        } catch (err) {
            console.error("Error al obtener todos los pacientes (findAll0):", err);
            res.status(500).send(err.message);
        }
    },

    findById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await new Promise((resolve, reject) => {
                Pasiente.findById(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.json({ data: result });
            console.log(result);
        } catch (err) {
            console.error("Error al obtener paciente por ID:", err);
            res.status(500).send(err.message);
        }
    },

    findAllPlans: async (req, res) => {
        try {
            const results = await new Promise((resolve, reject) => {
                Pasiente.findAllPlans((err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });

            res.json(results);
        } catch (err) {
            console.error("Error al obtener todos los planes:", err);
            res.status(500).send(err.message);
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nomEdit, apellEdit, dniEdit, fechaEdit, sexoEdit, id_planE } = req.body;

            console.log('edit:', nomEdit, apellEdit, dniEdit, fechaEdit, sexoEdit, id_planE);

            await new Promise((resolve, reject) => {
                Pasiente.update(id, nomEdit, apellEdit, dniEdit, fechaEdit, sexoEdit, id_planE, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('pasiente/crear_pasiente', {
                alert: true,
                alertTitle: "SE HA ACTUALIZADO EL PACIENTE",
                alertMessage: "PACIENTE ACTUALIZADO ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'crea_pasiente'
            });
        } catch (err) {
            console.error("Error al actualizar paciente:", err);
            res.status(500).send(err.message);
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await new Promise((resolve, reject) => {
                Pasiente.delete(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('pasiente/crear_pasiente', {
                alert: true,
                alertTitle: "SE HA BORRADO EL PACIENTE",
                alertMessage: "PACIENTE BORRADO ¡",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 600,
                ruta: 'crea_pasiente'
            });
        } catch (err) {
            console.error("Error al borrar paciente:", err);
            res.status(500).send(err.message);
        }
    },

    altaPas: async (req, res) => {
        try {
            const { id } = req.params;
            await new Promise((resolve, reject) => {
                Pasiente.altaPas(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('pasiente/altaPasBorrado', {
                alert: true,
                alertTitle: "SE DIO ALTA AL PACIENTE",
                alertMessage: "ALTA PACIENTE ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 600,
                ruta: 'altaBorrado'
            });
        } catch (err) {
            console.error("Error al dar alta al paciente:", err);
            res.status(500).send(err.message);
        }
    }
};

module.exports = pasienteController;
