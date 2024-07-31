const Prescripcion = require('../models/Prescripcion');
const PDFDocument = require('pdfkit');

const prescController = {
    create: async (req, res) => {
        try {
            const { familia } = req.body;
            await new Promise((resolve, reject) => {
                Prescripcion.create(familia, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('medicamento/atributosMed', {
                alert: true,
                alertTitle: "SE HA GUARDADO FAMILIA",
                alertMessage: "FAMILIA GUARDADA ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'atributos_med'
            });
        } catch (err) {
            console.error("Error al crear familia:", err);
            res.status(500).send(err.message);
        }
    },

    user: (req, res) => {
        const { name: nombre, dni, user, rol } = req.user;
        const data = { nombre, dni, user, rol };
        console.log(`${dni}${user}${rol}`);
        res.render('crear_reseta/gestion_reseta', { alert: false, data });
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await new Promise((resolve, reject) => {
                Prescripcion.delete(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('crear_reseta/gestion_reseta', {
                alert: true,
                alertTitle: "SE HA BORRADO PRESCRIPCIÓN",
                alertMessage: "PRESCRIPCIÓN BORRADA ¡",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 600,
                ruta: 'gestionReseta'
            });
        } catch (err) {
            console.error("Error al borrar prescripción:", err);
            res.status(500).send(err.message);
        }
    },

    alta: async (req, res) => {
        try {
            const { id } = req.params;
            await new Promise((resolve, reject) => {
                Prescripcion.alta(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.render('crear_reseta/gestion_reseta', {
                alert: true,
                alertTitle: "SE DIO ALTA PRESCRIPCIÓN",
                alertMessage: "ALTA PRESCRIPCIÓN ¡",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'gestionReseta'
            });
        } catch (err) {
            console.error("Error al dar alta a prescripción:", err);
            res.status(500).send(err.message);
        }
    },

    findAll: async (req, res) => {
        try {
            const { dni, rol } = req.user;
            let results;

            if (rol === "Administrador") {
                results = await new Promise((resolve, reject) => {
                    Prescripcion.findAll((err, results) => {
                        if (err) return reject(err);
                        resolve(results);
                    });
                });
            } else {
                results = await new Promise((resolve, reject) => {
                    Prescripcion.findAllDni(dni, (err, results) => {
                        if (err) return reject(err);
                        resolve(results);
                    });
                });
            }

            res.json(results);
        } catch (err) {
            console.error("Error al obtener todas las prescripciones:", err);
            res.status(500).send(err.message);
        }
    },

    findAll0: async (req, res) => {
        try {
            const { dni, rol } = req.user;
            let results;

            if (rol === "Administrador") {
                results = await new Promise((resolve, reject) => {
                    Prescripcion.findAll0((err, results) => {
                        if (err) return reject(err);
                        resolve(results);
                    });
                });
            } else {
                results = await new Promise((resolve, reject) => {
                    Prescripcion.findAll0Dni(dni, (err, results) => {
                        if (err) return reject(err);
                        resolve(results);
                    });
                });
            }

            res.json(results);
        } catch (err) {
            console.error("Error al obtener todas las prescripciones (findAll0):", err);
            res.status(500).send(err.message);
        }
    },

    findById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = req.user;

            const result = await new Promise((resolve, reject) => {
                Prescripcion.findId(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            if (result.prestaciones.length > 0 || result.medicamentos.length > 0) {
                const data = {
                    prestaciones: result.prestaciones.map(p => p.prestacion),
                    id_prestac: result.prestaciones.map(p => p.id_presta),
                    medicamentos: result.medicamentos.map(m => ({
                        id_med: m.id_med,
                        id_administracion: m.id_administracion,
                        nombre_generico: m.nombre_generico,
                        nombre_comercial: m.nombre_comercial,
                        presentacion: m.presentacion,
                        concentracion: m.concentracion,
                        familia: m.familia,
                        forma_fa: m.forma_fa,
                        cantidad: m.cantidad,
                        duracion: m.duracion,
                        frecuencia: m.frecuencia,
                        dosis: m.dosis,
                    })),
                    profesional: result.profPas.map(p => ({
                        id_prof: p.id_prof,
                        nombre_prof: p.nombre_prof,
                        apellido_prof: p.apellido_prof,
                        matricula: p.matricula,
                        tipo_esp: p.tipo_esp,
                        numero: p.numero,
                        dni_prof: p.dni_prof,
                        tel_prof: p.tel_prof,
                    })),
                    paciente: result.profPas.map(p => ({
                        id_pas: p.id_pas,
                        nombre_pas: p.nombre_pas,
                        apellido_pas: p.apellido_pas,
                        sexo_pas: p.sexo_pas,
                        dni_pas: p.dni_pas,
                        fecha_nac_pas: p.fecha_nac_pac,
                        tipo_plan: p.tipo_plan,
                        nombre_obra: p.nombre_obra,
                        fecha_pres: p.fecha_presc,
                        indicacion: p.indicacion,
                        diagnostico: p.diagnostico,
                        id_presc: p.id_presc,
                    }))
                };

                console.log(result);
                res.render('crear_reseta/editPresc', { alert: false, data, user });
            } else {
                res.status(404).send('Prescripción no encontrada');
            }
        } catch (err) {
            console.error("Error al obtener prescripción por ID:", err);
            res.status(500).send(err.message);
        }
    }
    ,
    printPdf: (req, res) => {
        const data = req.body;

        const doc = new PDFDocument();
        let filename = 'reseta.pdf';
        filename = encodeURIComponent(filename);

        res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-type', 'application/pdf');

        doc.pipe(res);

        doc.fontSize(20).text('Receta Médica', { align: 'center' });
        doc.moveDown();
        
        doc.fontSize(12).text(`Nombre del Profesional: ${data.nombre_prof}`);
       
        doc.text(`DNI Profesional: ${data.dni_prof}`);
        doc.text(`Matrícula: ${data.matricula}`);
        doc.text(`Refeps: ${data.refeps}`);
        doc.text(`Teléfono: ${data.telefono}`);
        doc.text(`Especialidad: ${data.especialidad}`);
        doc.moveDown();
    
        doc.text(`Nombre del Paciente: ${data.nombre_pas}-${data.dni_pas}-${data.fecha_nac_pas}-${data.sexo_pas}-${data.obra_social}`);
        doc.moveDown();
    
        doc.text(`Diagnóstico: ${data.diagnostico}`);
        doc.moveDown();
let indexo = 1;    
        doc.fontSize(12).text('Medicamentos y Administraciones');
        data.medicamentos.forEach(med => {
            doc.moveDown();
            doc.fontSize(12).text(`${indexo }.Medicamento: ${med.nombre_generico}-${med.nombre_comercial}- ${med.concentracion}-${med.forma_fa}-${med.presentacion}-${med.familia}`);
        
            doc.text(`Dosis: ${med.dosis}`);
            doc.text(`Frecuencia: ${med.frecuencia}`);
            doc.text(`Duracion: ${med.duracion}`);
            doc.text(`Cantidad: ${med.cantidad}`);
            indexo++;
        });
let index = 1;
        doc.moveDown();
        doc.text(`Indicaciones: ${data.indicacion}`);
        doc.moveDown();
        doc.fontSize(12).text('Prestaciones');
        data.prestaciones.forEach(pres => {
            doc.moveDown();
           
            doc.text(`${index }. ${pres.prestacion}`);
            index++;
        });

     
        doc.end();




    }
};

module.exports = prescController;