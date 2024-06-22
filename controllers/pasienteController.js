const Pasiente = require('../models/Pasiente');

const pasienteController = {
    create: (req, res) => {
        const { nombre, apellido, dni, fecha_nac, sexo, alta, id_plan} = req.body;
        const todo = req.body;
        // Validar que el DNI no esté vacío y que contenga solo números
               const dniRegex = /^[0-9]+$/;
            if (!dni || !dniRegex.test(dni)) {
            return      res.render('pasiente/crear_pasiente', {
                alert: true,
                alertTitle: "COLOQUE UN NUMERO VALIDO",
                alertMessage: "DNI DISTINTO VALOR ¡",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 800,
                ruta: 'crea_pasiente'
            })
            
  }
        Pasiente.findByDni(dni,(err, results)=>{
            if(err){
                return res.status(500).send(err);
            }
            if(results.length > 0){
                res.render('pasiente/crear_pasiente', {
                    alert: true,
                    alertTitle: "ERROR EL DNI YA EXISTE",
                    alertMessage: "DNI REPETIDO ¡",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'crea_pasiente'
                })
            }else{
                Pasiente.create( nombre, apellido, dni, fecha_nac, sexo, alta, id_plan, (err, result) => {
          
                    console.log(todo);
                    
                    if (err) {
                        return res.status(500).send(err);
                    }
                         res.render('pasiente/crear_pasiente', {
                    alert: true,
                    alertTitle: "SE A GUARDADO EL PASIENTE ",
                    alertMessage: "PASIENTE GUARDADO ¡" ,
                    alertIcon: 'access',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'crea_pasiente'
                })
                });
            }
        })
     
    },
    findAll: (req, res) => {
        Pasiente.findAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    findById: (req, res) => {
        const { id } = req.params;
        Pasiente.findById(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(result);
        });
    },
    findAllPlans: (req, res) => {
        Pasiente.findAllPlans((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },


    update: (req, res) => {
        const { id } = req.params;
        const { nombre, apellido, dni, fecha_nac, sexo, alta, id_plan } = req.body;
        Pasiente.update(id, nombre, apellido, dni, fecha_nac, sexo, alta, id_plan , (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send('pasiente actualizado exitosamente');
        });
    },
    delete: (req, res) => {
        const { id } = req.params;
        Pasiente.delete(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send('pasiente eliminado exitosamente');
        });
    }
};

module.exports = pasienteController;