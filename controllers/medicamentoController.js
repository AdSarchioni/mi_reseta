const Medicamento = require('../models/Medicamento');

const medicamentoController = {
    create: async (req, res) => {
        try {
            const { id_reg_nac, nombre_generico, nombre_comercial, id_concent, id_for_fa, id_fam, id_present } = req.body;

            // Verificar si alguno de los valores requeridos está vacío
            if (!id_reg_nac || !nombre_generico || !nombre_comercial || !id_concent || !id_for_fa || !id_fam || !id_present) {
                return res.render('medicamento/crear_medicamento', {
                    alert: true,
                    alertTitle: "MEDICAMENTO NO VALIDO",
                    alertMessage: "FALTAN VALORES O VALORES INCORRECTOS ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'crea_medicamento'
                });
            }

            await new Promise((resolve, reject) => {
                Medicamento.create(id_reg_nac, nombre_generico, nombre_comercial, id_concent, id_for_fa, id_fam, id_present, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/crear_medicamento', {
                alert: true,
                alertTitle: "SE HA GUARDADO MEDICAMENTO",
                alertMessage: "MEDICAMENTO GUARDADO ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'crea_medicamento'
            });
        } catch (err) {
            console.error("Error al guardar medicamento:", err);
            res.status(500).send(err);
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { id_reg_nac, nombre_generico, nombre_comercial, id_concent, id_for_fa, id_fam, id_present } = req.body;
            // Verificar si alguno de los valores requeridos está vacío
            if (!id_reg_nac || !nombre_generico || !nombre_comercial || !id_concent || !id_for_fa || !id_fam || !id_present) {
                return res.render('medicamento/crear_medicamento', {
                    alert: true,
                    alertTitle: "MEDICAMENTO NO VALIDO",
                    alertMessage: "FALTAN VALORES O VALORES INCORRECTOS ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'crea_medicamento'
                });
            }
            await new Promise((resolve, reject) => {
                Medicamento.update(id, id_reg_nac, nombre_generico, nombre_comercial, id_concent, id_for_fa, id_fam, id_present, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/crear_medicamento', {
                alert: true,
                alertTitle: "SE HA ACTUALIZADO MEDICAMENTO",
                alertMessage: "MEDICAMENTO ACTUALIZADO ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'crea_medicamento'
            });
        } catch (err) {
            console.error("Error al actualizar medicamento:", err);
            res.status(500).send(err);
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                Medicamento.delete(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/crear_medicamento', {
                alert: true,
                alertTitle: "SE HA BORRADO MEDICAMENTO",
                alertMessage: "MEDICAMENTO BORRADO ¡",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 600,
                ruta: 'crea_medicamento'
            });
        } catch (err) {
            console.error("Error al borrar medicamento:", err);
            res.status(500).send(err);
        }
    },

    alta: async (req, res) => {
        try {
            const { id } = req.params;

            await new Promise((resolve, reject) => {
                Medicamento.alta(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/crear_medicamento', {
                alert: true,
                alertTitle: "SE DIO ALTA A MEDICAMENTO",
                alertMessage: "ALTA MEDICAMENTO ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'crea_medicamento'
            });
        } catch (err) {
            console.error("Error al dar alta a medicamento:", err);
            res.status(500).send(err);
        }
    },

    // Métodos que no necesitan cambios
    findAll: (req, res) => {
        Medicamento.findAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },

    findAll0: (req, res) => {
        Medicamento.findAll0((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },

    findById: (req, res) => {
        const { id } = req.params;
        Medicamento.findId(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            res.json({ data: result });
            console.log(result);
        });
    }
};

module.exports = medicamentoController;
