const Medicamento = require('../models/Medicamento');

const medicamentoController = {
    create: (req, res) => {
const tod = req.body;

console.log("Resultados tod:", JSON.stringify(tod, null, 2))
        const { id_reg_nac, nombre_generico, nombre_comercial, id_concent, id_for_fa, id_fam, id_present } = req.body;
    
            Medicamento.create(id_reg_nac, nombre_generico, nombre_comercial, id_concent, id_for_fa, id_fam, id_present, (err, result) => {
     
            if (err) {
                return res.status(500).send(err);
            }

            res.render('medicamento/crear_medicamento', {
                alert: true,
                alertTitle: "SE A GUARDADO MEDICAMENTO ",
                alertMessage: "MEDICAMENTO GUARDADO ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'crea_medicamento'
            })
        });
    },


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
           
            res.json({data:result});
            console.log(result); 
        });
    },
    update: (req, res) => {
        const { id } = req.params;
        const {id_reg_nac, nombre_generico, nombre_comercial, alta_med, id_concent, id_for_fa, id_fam, id_present}  = req.body;

        Medicamento.update(id, id_reg_nac, nombre_generico, nombre_comercial, alta_med, id_concent, id_for_fa, id_fam, id_present, (err, result) => {
            console.log('id2'+id);
            
            if (err) {
                return res.status(500).send(err);
            }
            res.render('medicamento/crear_medicamento', {
                alert: true,
                alertTitle: "SE A ACTUALIZADO MEDICAMENTO ",
                alertMessage: "MEDICAMENTO ACTUALIZADO ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'crea_medicamento'
            })
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        Medicamento.delete(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('medicamento/crear_medicamento', {
                    alert: true,
                    alertTitle: "SE A BORRADO MEDICAMENTO ",
                    alertMessage: "MEDICAMENTO BORRADO ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 600,
                    ruta: 'crea_medicamento'
                })
            }
        }
        );
    },
    alta: (req, res) => {
        const { id } = req.params;
        Medicamento.alta(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('medicamento/crear_medicamento', {
                    alert: true,
                    alertTitle: "SE DIO ALTA MEDICAMENTO ",
                    alertMessage: "ALTA MEDICAMENTO ¡",
                    alertIcon: 'access',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'crea_medicamento'
                })
            }
        }
        );
    }
};

module.exports = medicamentoController;