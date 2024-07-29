const Concentracion = require('../models/Concentracion');

const concController = {
    create: async (req, res) => {
        try {
            const { concentracion } = req.body;
            const ctrlRegex = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]+$/; // Se incluye \s para permitir espacios en blanco

            if (!concentracion || !ctrlRegex.test(concentracion)) {
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
                Concentracion.create(concentracion, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE HA GUARDADO CONCENTRACIÓN",
                alertMessage: "CONCENTRACIÓN GUARDADA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            });
        } catch (err) {
            console.error("Error al crear concentración:", err);
            res.status(500).send(err);
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const concentracion = req.body.concentracionEdit;

            await new Promise((resolve, reject) => {
                Concentracion.update(id, concentracion, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE HA ACTUALIZADO CONCENTRACIÓN",
                alertMessage: "CONCENTRACIÓN ACTUALIZADA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            });
        } catch (err) {
            console.error("Error al actualizar concentración:", err);
            res.status(500).send(err);
        }
    },

    delete: async (req, res) => {
        try {
            const { id_conc } = req.params;

            await new Promise((resolve, reject) => {
                Concentracion.delete(id_conc, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE HA BORRADO CONCENTRACIÓN",
                alertMessage: "CONCENTRACIÓN BORRADA ¡",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 600,
                ruta: 'atributos_med'
            });
        } catch (err) {
            console.error("Error al eliminar concentración:", err);
            res.status(500).send(err);
        }
    },

    altaConc: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                Concentracion.altaConc(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE DIO ALTA A CONCENTRACIÓN",
                alertMessage: "ALTA CONCENTRACIÓN ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            });
        } catch (err) {
            console.error("Error al dar alta a concentración:", err);
            res.status(500).send(err);
        }
    },

    // Métodos que no necesitan cambios
    findAll: (req, res) => {
        Concentracion.findAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },

    findAll0: (req, res) => {
        Concentracion.findAll0((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },

    findById: (req, res) => {
        const { id } = req.params;
        Concentracion.findId(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
           
            res.json({ data: result });
            console.log(result); 
        });
    }
};

module.exports = concController;
