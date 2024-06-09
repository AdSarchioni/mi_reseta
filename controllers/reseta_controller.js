const conexion = require('../database/db');
const PDF = require('pdfkit');
const fs = require('fs');
const path = require('path');
const controller = {};



controller.crea_reseta = (req, res) => {

    const nombre = req.user.name;
    const dni = req.user.dni;
    const user = req.user.user;
    const data = { nombre, dni, user }
    res.render('crear_reseta/crear_reseta', { alert: false, data: data });
}
controller.dataPasciente = (req, res) => {
    conexion.query(`SELECT 
     p.id_pas AS id_pas,
     p.nombre_pas AS nombre_pas, 
     p.apellido_pas AS apellido_pas, 
     p.dni_pas AS dni_pas,
     p.fecha_nac_pas AS fecha_nac_pas,
     p.sexo_pas AS sexo_pas,
     p.alta_pas AS alta_pas,
     p.id_plan_obra_social AS id_plan_obra_social,
    pl.tipo_plan AS tipo_plan, 
     pl.id_obra_social AS id_obra_social,
     o.nombre_obra AS nombre_obra 
FROM 
     pasciente p 
LEFT JOIN 
     plan_obra_social pl ON p.id_plan_obra_social = pl.id_plan_obra_social
LEFT JOIN 
    obra_social o ON pl.id_obra_social = o.id_obra_social;`, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
}



controller.paraListPas = (req, res) => {
    const idCombo1 = req.params.valorImput1;
    conexion.query(`SELECT * FROM  pasciente WHERE nombre_pas = '${idCombo1}'`, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener opciones del Combo Box 1' });
        } else {
            res.json(results);
            console.log("Resultados de la consulta:", JSON.stringify(results, null, 2))
        }
    });

}
controller.paraListProf = (req, res) => {
    const idCombo1 = req.params.valorImput1;
    conexion.query(`SELECT 
    p.id_refer,
    p.id_prof,
    p.nombre_prof,
    p.apellido_prof,
    p.dni_prof,
    p.domicilio_prof,
    p.mail_prof,
    p.tel_prof,
    e.id_especialidad,
    e.tipo_esp,
    pe.matricula
FROM 
    profesional p
JOIN 
    prof_espec pe ON p.id_prof = pe.id_prof
JOIN 
    especialidad e ON pe.id_especialidad = e.id_especialidad
WHERE 
    p.dni_prof ='${idCombo1}'`, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener opciones del Combo Box 1' });
        } else {
            res.json(results);
            console.log("Resultados de la consulta:", JSON.stringify(results, null, 2))
        }
    });

}
controller.save = (req, res) => {
    const data = req.body;

    res.redirect('crea_reseta')


    console.log("Resultados del submit:", JSON.stringify(data, null, 2))
}

controller.getPrestaciones = (req, res) => {
    conexion.query('SELECT id_presta,nombre FROM prestacion', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};
controller.getPrestacionesId = (req, res) => {
    conexion.query('SELECT id_presta AS nombre FROM prestacion', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};


controller.cargarMedDataList = (req, res) => {
    const query = 'SELECT m.id_med AS id,m.nombre_comercial AS nombre, m.nombre_generico AS nombre_generico, m.nombre_comercial AS nombre_comercial, m.id_concent AS id_concent, c.concentracion AS concentracion, m.id_for_fa AS id_for_fa, f.forma_fa AS forma_farma FROM medicamentos m LEFT JOIN concentracion c ON m.id_concent = c.id_conc LEFT JOIN forma_farma f ON m.id_for_fa = f.id_for_fa;';
    conexion.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error querying the database');
            return;
        }

        res.json(results);

        console.log("Resultados del submit:", JSON.stringify(results, null, 2))
    });
};
controller.getDosisList = (req, res) => {
    conexion.query('SELECT id_dosis AS id, nombre FROM dosis', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};

controller.getCantidadList = (req, res) => {
    conexion.query('SELECT id_cantidad AS id, nombre FROM cantidad', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};

controller.getFrecuenciaList = (req, res) => {
    conexion.query('SELECT id_frecuencia AS id, nombre FROM frecuencia', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};

controller.getDuracionList = (req, res) => {
    conexion.query('SELECT id_duracion AS id, nombre FROM duracion', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};

controller.cargarPresc = async (req, res) => {
    const diagnostico = req.body.diagnostico;
    const indicacion = req.body.indicacion;
    const id_prof = req.body.id_prof;
    const id_pas = req.body.id_pas;
    const body = req.body;
    const fecha_pres = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
    const vigencia = '1 mes';
    const administraciones = [];

    const prestaciones = [];
   
   
   

    const keys = Object.keys(body);
    
    const ids = keys.filter(key => key.startsWith('medicamentoId'));
    const idsP =keys.filter(key => key.startsWith('idPrestacion'));

    idsP.forEach(idKeyP => {
        const indexP = idKeyP.replace('idPrestacion', '');
        const prestacion = {
            id_presta: body[`idPrestacion${indexP}`],
            nomPrest:body[`datalista${indexP}`]
        };
        prestaciones.push(prestacion);
     
    });
    console.log("Resultados prestaciones:", JSON.stringify(prestaciones, null, 2));
    ids.forEach(idKey => {
        const index = idKey.replace('medicamentoId', '');
        const administracion = {
            id_med: body[`medicamentoId${index}`],
            id_dosis: body[`dosisId${index}`],
            id_cantidad: body[`cantidadId${index}`],
            id_frecuencia: body[`frecuenciaId${index}`],
            id_duracion: body[`duracionId${index}`]
        };
        administraciones.push(administracion);
     
    });



    console.log("Resultados del submit:", JSON.stringify(body, null, 2));

    try {
        // Iniciar la transacción
        await conexion.beginTransaction();

        // Paso 1: Insertar la prescripción en la tabla `prescripcion`
        const result = await new Promise((resolve, reject) => {
            conexion.query(
                'INSERT INTO prescripcion (diagnostico, indicacion, fecha_pres, vigencia, id_prof, id_pas) VALUES (?, ?, ?, ?, ?, ?)',
                [diagnostico,indicacion, fecha_pres, vigencia, id_prof, id_pas],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });

        const id_presc = result.insertId;
        console.log("Prescripción insertada con ID:", id_presc);

        // Paso 2 y 3: Insertar las administraciones y las asociaciones en `presc_admin`
       if(administraciones){
        for (const admin of administraciones) {
            try {
                const resultAdmin = await new Promise((resolve, reject) => {
                    conexion.query(
                        'INSERT INTO administracion (id_dosis, id_frecuencia, id_cantidad, id_duracion, id_med) VALUES (?, ?, ?, ?, ?)',
                        [admin.id_dosis, admin.id_frecuencia, admin.id_cantidad, admin.id_duracion, admin.id_med],
                        (error, results) => {
                            if (error) return reject(error);
                            resolve(results);
                        }
                    );
                });

                const id_admin = resultAdmin.insertId;

                await new Promise((resolve, reject) => {
                    conexion.query(
                        'INSERT INTO  presc_admin (id_presc, id_admin) VALUES (?, ?)',
                        [id_presc, id_admin],
                        (error, results) => {
                            if (error) return reject(error);
                            resolve(results);
                        }
                    );
                });

            } catch (error) {
                // Si hay un error, registrar y revertir la transacción
                console.error('Error al insertar administración:', error);
                await conexion.rollback();
                res.status(500).json({ message: 'Error al crear la prescripción', error });
                return; // Salir del bucle si hay un error
            }
        }
    }
    if(prestaciones){
        for (const presta of prestaciones) {
            try {
            

                await new Promise((resolve, reject) => {
                    conexion.query(
                        'INSERT INTO prescripcion_prestacion (id_presc, id_presta) VALUES (?, ?)',
                        [id_presc, presta.id_presta],
                        (error, results) => {
                            if (error) return reject(error);
                            resolve(results);
                        }
                    );
                });

            } catch (error) {
                // Si hay un error, registrar y revertir la transacción
                console.error('Error al insertar administración:', error);
                await conexion.rollback();
                res.status(500).json({ message: 'Error al crear la prestacion', error });
                return; // Salir del bucle si hay un error
            }
        }
    }

        // Confirmar la transacción
        await conexion.commit();

        res.status(201).json({ message: 'Prescripción y administraciones creadas exitosamente' });
    } catch (error) {
        // Revertir la transacción en caso de error
        await conexion.rollback();
        console.error('Error al crear la prescripción:', error);
        res.status(500).json({ message: 'Error al crear la prescripción', error });
    }
};


controller.imprimirReceta1 = async (req, res) => {
   
const doc = new PDF();
doc.text('Acá estamos de vuelta');
    
// Obtener la ruta completa de la carpeta "public/libs"
const folderPath = path.resolve(__dirname, '..', 'public', 'libs');

// Verificar si la carpeta existe, si no existe, crearla
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
}

// Crear un flujo de escritura hacia el archivo reseta.pdf en la carpeta "public/libs"
const writeStream = fs.createWriteStream(path.join(folderPath, 'reseta.pdf'));

// Pipe el contenido del documento PDF al flujo de escritura
doc.pipe(writeStream);

// Finalizar la escritura del documento
doc.end();

// Manejar eventos de error y finalización del flujo de escritura
writeStream.on('finish', () => {
    console.log('¡Archivo guardado correctamente!');
    res.send('¡Archivo guardado correctamente!');
});
writeStream.on('error', (err) => {
    console.error('Error al guardar el archivo:', err);
    res.status(500).send('Error al guardar el archivo');
});


};

controller.imprimirReceta = async (req, res) => {
    const { nombre_prof, nombre_pas } = req.body;

    // Verificar si los datos se han capturado correctamente
    console.log("Nombre del Profesor:", nombre_prof);
    console.log("Materia:", nombre_pas);
    // Puedes agregar más variables según los campos del formulario

    const filename = `reseta${Date.now()}.pdf`;
    const doc = new PDF({ bufferPages: true });

    // Configurar la respuesta para el navegador
    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=${filename}`
    });

    // Crear el PDF
    doc.on('data', (data) => { res.write(data); });
    doc.on('end', () => { res.end(); });

    // Agregar contenido al PDF
    doc.text(`Nombre del Profesor: ${nombre_prof}`);
    doc.text(`Materia: ${nombre_pas}`);
    // Puedes agregar más texto según los campos del formulario

    doc.end();
};






module.exports = controller;
