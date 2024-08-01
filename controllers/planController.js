const PlanObra = require('../models/PlanObra');

const planController = {
    create: async (req, res) => {
        try {
            const { tipo_plan } = req.body;
            const {id_obra_social}= req.body;

            const ctrlRegex = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]+$/;

            if (!tipo_plan || !ctrlRegex.test(tipo_plan) ||!ctrlRegex.test(id_obra_social) || !id_obra_social ) {
                return res.render('pasiente/atributosPas', {
                    alert: true,
                    alertTitle: "COLOQUE UN VALOR VALIDO",
                    alertMessage: "NO PUEDE ESTAR VACÍO Y DEBE CONTENER LETRAS, NÚMEROS O SÍMBOLOS",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'atributos_obra'
                });
            }

            await new Promise((resolve, reject) => {
                PlanObra.create(tipo_plan, id_obra_social, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('pasiente/atributosPas', {
                alert: true,
                alertTitle: "SE HA GUARDADO OBRA SOCIAL",
                alertMessage: "OBRA SOCIAL GUARDADA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_obra'
            });
        } catch (err) {
            console.error("Error al guardar obra:", err);
            res.status(500).send(err);
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const tipo_plan = req.body.planEdit;
            const id_obra_social =req.body.id_obra_socialE;
            const ctrlRegex = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]+$/;

            if (!tipo_plan || !ctrlRegex.test(tipo_plan)) {
                return res.render('pasiente/atributosPas', {
                    alert: true,
                    alertTitle: "COLOQUE UN VALOR VALIDO",
                    alertMessage: "NO PUEDE ESTAR VACÍO Y DEBE CONTENER LETRAS, NÚMEROS O SÍMBOLOS",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'atributos_obra'
                });
            }
            await new Promise((resolve, reject) => {
                PlanObra.update(id, tipo_plan, id_obra_social, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('pasiente/atributosPas', {
                alert: true,
                alertTitle: "SE HA ACTUALIZADO OBRA SOCIAL",
                alertMessage: "OBRA SOCIAL ACTUALIZADA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_obra'
            });
        } catch (err) {
            console.error("Error al actualizar obra social:", err);
            res.status(500).send(err);
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                PlanObra.delete(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('pasiente/atributosPas', {
                alert: true,
                alertTitle: "SE HA BORRADO OBRA SOCIAL",
                alertMessage: "OBRA SOCIAL BORRADA ¡",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 600,
                ruta: 'atributos_obra'
            });
        } catch (err) {
            console.error("Error al borrar obra social:", err);
            res.status(500).send(err);
        }
    },

    alta: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                PlanObra.alta(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('pasiente/atributosPas', {
                alert: true,
                alertTitle: "SE DIO ALTA A OBRA SOCIAL",
                alertMessage: "ALTA OBRA SOCIAL ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_obra'
            });
        } catch (err) {
            console.error("Error al dar alta a obra social:", err);
            res.status(500).send(err);
        }
    },

    // Métodos que no necesitan cambios
    findAll: (req, res) => {
        PlanObra.findAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },

    findAll0: (req, res) => {
        PlanObra.findAll0((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },

    findById: (req, res) => {
        const { id } = req.params;
        PlanObra.findId(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
           
            res.json({ data: result });
            console.log(result); 
        });
    }
};

module.exports = planController;
