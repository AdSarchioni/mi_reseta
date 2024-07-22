const Prescripcion = require('../models/Prescripcion');

const prescController = {
    create: (req, res) => {
        const { familia } = req.body;
    
        Prescripcion.create(familia, (err, result) => {
     
            if (err) {
                return res.status(500).send(err);
            }

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE A GUARDADO FAMILIA ",
                alertMessage: "FAMILIA GUARDADA ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            })
        });
    },


    findAll: (req, res) => {
        Prescripcion.findAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findAll0: (req, res) => {
        Prescripcion.findAll0((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findById: (req, res) => {
        const { id } = req.params;
        Prescripcion.findId(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            
            if (result.prestaciones.length > 0 || result.medicamentos.length > 0) {
                const data = {
                    prestaciones: result.prestaciones.map(p => p.prestacion),
                    id_prestac: result.prestaciones.map(p => p.id_presta),
                    medicamentos: result.medicamentos.map(m => m.nombre_generico),
                    id_medi: result.medicamentos.map(m => m.id_med),
                    cantidad : result.medicamentos.map(can =>can.cantidad),
                    duracion : result.medicamentos.map(du =>du.duracion)
                };
                console.log(result);
                res.render('crear_reseta/editPresc', { alert: false, data: data });
            } else {
                res.status(404).send('Prescripción no encontrada');
            }
        });
    },
    

    deletes : (req, res) => {
        const { id } = req.params;
        try {
              conexion.query('DELETE FROM pasientes WHERE id = ?', [id], (err, rows) => {
                    res.redirect('/guarPa');
              });
  
        } catch (error) {
              console.log(error);
        };
  },
  
  edits : (req, res) => {
        const { id } = req.params;
        try {
              conexion.query('SELECT * FROM pasientes  WHERE id = ?', [id], (err, results) => {
  
                    res.render('rpc/guarPa_Edit', {
                          data: results[0]
                    });
  
              });
        } catch (error) {
              console.log(error);
        }
  },






















    update: (req, res) => {
        const { id } = req.params;
        const familia  = req.body.famEdit;

        Prescripcion.update(id, familia, (err, result) => {
            console.log('id2'+id);
            
            if (err) {
                return res.status(500).send(err);
            }
            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE A ACTUALIZADO  FAMILIA ",
                alertMessage: "FAMILIA ACTUALIZADA ¡",
                alertIcon: 'access',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            })
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        Prescripcion.delete(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('medicamento/atributosMed', {
                    alert: true,
                    alertTitle: "SE A BORRADO FAMILIA ",
                    alertMessage: "FAMILIA BORRADA ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 600,
                    ruta: 'atributos_med'
                })
            }
        }
        );
    },
    alta: (req, res) => {
        const { id } = req.params;
        Prescripcion.altaForm(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            else {
                return res.render('medicamento/atributosMed', {
                    alert: true,
                    alertTitle: "SE DIO ALTA FAMILIA ",
                    alertMessage: "ALTA FAMILIA ¡",
                    alertIcon: 'access',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'atributos_med'
                })
            }
        }
        );
    }
};

module.exports = prescController;