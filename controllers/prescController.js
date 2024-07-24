const Prescripcion = require('../models/Prescripcion');
const PDFDocument = require('pdfkit');
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
    user: (req, res) => {
        const nombre = req.user.name;
        const dni = req.user.dni;
        const user = req.user.user;
        const data = { nombre, dni, user }
        res.render('crear_reseta/gestion_reseta', { alert: false, data: data });

  
    },


    findAll: (req, res) => {
     
        const dni = req.user.dni;
        const rol = req.user.rol;
  
if (rol === "Administrador"){
    Prescripcion.findAll((err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
}else{
        Prescripcion.findAllDni(dni,(err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });


    }

   
    },
    findAll0: (req, res) => {
     
        const dni = req.user.dni;
        const rol = req.user.rol;
  
if (rol === "Administrador"){
    Prescripcion.findAll0((err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
}else{
        Prescripcion.findAll0Dni(dni,(err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });


    }

   
    }
 ,
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
                        id_administracion: m.id_administracion,
                    

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
                        fecha_pres: p.fecha_pres,
                        indicacion: p.indicacion,
                        diagnostico: p.diagnostico,
                        id_presc: p.id_presc,
                    }))
                };
                console.log(result);
                res.render('crear_reseta/editPresc', { alert: false, data: data });
            } else {
                res.status(404).send('Prescripción no encontrada');
            }
        });
    }
    ,
printPdf: (req, res) => {
    const data = req.body;

    const doc = new PDFDocument();
    let filename = 'prescription-data.pdf';
    filename = encodeURIComponent(filename);
  
    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');
  
    doc.pipe(res);
  
    doc.fontSize(20).text('Receta Médica', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Diagnostico: ${data.diagnostico}`);
    doc.text(`Indicacion: ${data.indicacion}`);
    doc.text(`Fecha: ${data.fecha_pres}`);
    doc.text(`Paciente: ${data.nombre_pas}`);
    doc.text(`ID Paciente: ${data.id_pas}`);
  
    doc.moveDown();
    doc.fontSize(16).text('Medicamentos', { align: 'center' });
    data.medicamentos.forEach(med => {
      doc.moveDown();
      doc.fontSize(12).text(`Nombre Generico: ${med.nombre_generico}`);
      doc.text(`Nombre Comercial: ${med.nombre_comercial}`);
      doc.text(`Concentracion: ${med.concentracion}`);
      doc.text(`Presentacion: ${med.presentacion}`);
      doc.text(`Familia: ${med.familia}`);
      doc.text(`Forma Farmaceutica: ${med.forma_fa}`);
      doc.text(`Dosis: ${med.dosis}`);
      doc.text(`Frecuencia: ${med.frecuencia}`);
      doc.text(`Duracion: ${med.duracion}`);
      doc.text(`Cantidad: ${med.cantidad}`);
    });
  
    doc.moveDown();
    doc.fontSize(16).text('Prestaciones', { align: 'center' });
    data.prestaciones.forEach(pres => {
      doc.moveDown();
      doc.fontSize(12).text(`ID Medi: ${pres.id_medi}`);
      doc.text(`Prestacion: ${pres.prestacion}`);
    });
  
    doc.end();
  
  


}
};

module.exports = prescController;