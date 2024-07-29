const Profesional = require('../models/Profesional');

const profController = {
    create: async (req, res) => {
        try {
            const {
                id_refer, id_especialidad, matricula, nombre_prof,
                apellido_prof, dni_prof, domicilio_prof, mail_prof, tel_prof
            } = req.body;
            
            // Validar que el DNI no esté vacío y que contenga solo números
            const dniRegex = /^[0-9]+$/;
            if (!dni_prof || !dniRegex.test(dni_prof)) {
                return res.render('profesional/crear_profesional', {
                    alert: true,
                    alertTitle: "COLOQUE UN NÚMERO VÁLIDO",
                    alertMessage: "DNI DISTINTO VALOR ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'profesional'
                });
            }

            // Verificar si la matrícula ya existe
            const matriculaResult = await new Promise((resolve, reject) => {
                Profesional.findByMatri(matricula, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            if (matriculaResult.length > 0) {
                return res.render('profesional/crear_profesional', {
                    alert: true,
                    alertTitle: "ERROR: LA MATRÍCULA YA EXISTE",
                    alertMessage: "MATRÍCULA REPETIDA ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'profesional'
                });
            }

            // Verificar si el referente ya existe
            const referResult = await new Promise((resolve, reject) => {
                Profesional.findByRefeps(id_refer, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            if (referResult.length > 0) {
                return res.render('profesional/crear_profesional', {
                    alert: true,
                    alertTitle: "ERROR: EL REFERENTE YA EXISTE",
                    alertMessage: "REFERENTE REPETIDO ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'profesional'
                });
            }

            // Crear el profesional
            await new Promise((resolve, reject) => {
                Profesional.create(
                    id_refer, id_especialidad, matricula, nombre_prof, apellido_prof,
                    dni_prof, domicilio_prof, mail_prof, tel_prof, (err) => {
                        if (err) return reject(err);
                        resolve();
                    }
                );
            });

            res.render('profesional/crear_profesional', {
                alert: true,
                alertTitle: "SE HA CREADO EL PROFESIONAL",
                alertMessage: "¡PROFESIONAL CREADO!",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'profesional'
            });
        } catch (err) {
            console.error("Error al crear profesional:", err);
            res.status(500).send(err.message);
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                id_refer, id_especialidad, matricula, nombre_prof,
                apellido_prof, dni_prof, domicilio_prof, mail_prof, tel_prof
            } = req.body;
            
            // Validar que el DNI no esté vacío y que contenga solo números
            const dniRegex = /^[0-9]+$/;
            if (!dni_prof || !dniRegex.test(dni_prof)) {
                return res.render('profesional/crear_profesional', {
                    alert: true,
                    alertTitle: "COLOQUE UN NÚMERO VÁLIDO",
                    alertMessage: "DNI DISTINTO VALOR ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'profesional'
                });
            }

            // Verificar si la matrícula ya existe
            const matriculaResult = await new Promise((resolve, reject) => {
                Profesional.findByMatriU(matricula, id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            if (matriculaResult.length > 0) {
                return res.render('profesional/crear_profesional', {
                    alert: true,
                    alertTitle: "ERROR: LA MATRÍCULA YA EXISTE",
                    alertMessage: "MATRÍCULA REPETIDA ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'profesional'
                });
            }

            // Verificar si el referente ya existe
            const referResult = await new Promise((resolve, reject) => {
                Profesional.findByRefepsU(id_refer, id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            if (referResult.length > 0) {
                return res.render('profesional/crear_profesional', {
                    alert: true,
                    alertTitle: "ERROR: EL REFERENTE YA EXISTE",
                    alertMessage: "REFERENTE REPETIDO ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'profesional'
                });
            }

            // Actualizar el profesional
            await new Promise((resolve, reject) => {
                Profesional.update(
                    id, id_refer, id_especialidad, matricula, nombre_prof, apellido_prof,
                    dni_prof, domicilio_prof, mail_prof, tel_prof, (err) => {
                        if (err) return reject(err);
                        resolve();
                    }
                );
            });

            res.render('profesional/crear_profesional', {
                alert: true,
                alertTitle: "SE HA ACTUALIZADO EL PROFESIONAL",
                alertMessage: "¡PROFESIONAL ACTUALIZADO!",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'profesional'
            });
        } catch (err) {
            console.error("Error al actualizar profesional:", err);
            res.status(500).send(err.message);
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                Profesional.delete(id, (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });

            res.render('profesional/crear_profesional', {
                alert: true,
                alertTitle: "SE HA BORRADO EL PROFESIONAL",
                alertMessage: "¡PROFESIONAL BORRADO!",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 600,
                ruta: 'profesional'
            });
        } catch (err) {
            console.error("Error al borrar profesional:", err);
            res.status(500).send(err.message);
        }
    },

    alta: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                Profesional.alta(id, (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });

            res.render('profesional/crear_profesional', {
                alert: true,
                alertTitle: "SE DIO ALTA AL PROFESIONAL",
                alertMessage: "¡PROFESIONAL ALTA!",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 600,
                ruta: 'profesional'
            });
        } catch (err) {
            console.error("Error al dar alta al profesional:", err);
            res.status(500).send(err.message);
        }
    },

    // Métodos que no necesitan cambios
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
        const { refeps } = req.params;
        Profesional.findByRefeps(refeps, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json({ data: result });
            console.log(result);
        });
    }
};

module.exports = profController;
