const conexion = require('../database/db');

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
    const { diagnostico, fecha_pres, vigencia, id_prof, id_pas, id_med, administraciones } = req.body;

    try {
        // Iniciar la transacción
        await db.beginTransaction();

        // Paso 1: Insertar la prescripción en la tabla `prescripcion`
        const [prescriptionResult] = await db.query(
            'INSERT INTO prescripcion (diagnostico, fecha_pres, vigencia, id_prof, id_pas) VALUES (?, ?, ?, ?, ?)',
            [diagnostico, fecha_pres, vigencia, id_prof, id_pas]
        );
        const id_presc = prescriptionResult.insertId;

        // Paso 2 y 3: Insertar las administraciones y las asociaciones en `presc_admin`
        for (let admin of administraciones) {
            const [adminResult] = await db.query(
                'INSERT INTO administracion (id_dosis, id_frecuencia, id_cantidad, id_duracion,id_med) VALUES (?, ?, ?, ?,?)',
                [admin.id_dosis, admin.id_frecuencia, admin.id_cantidad, admin.id_duracion, admin.id_med]
            );
            const id_admin = adminResult.insertId;

            await db.query(
                'INSERT INTO presc_admin (id_presc, id_admin) VALUES (?, ?)',
                [id_presc, id_admin]

            );
        }

        // Confirmar la transacción
        await db.commit();

        res.status(201).json({ message: 'Prescripción y administraciones creadas exitosamente' });
    } catch (error) {
        // Revertir la transacción en caso de error
        await db.rollback();
        res.status(500).json({ message: 'Error al crear la prescripción', error });
    }
};





module.exports = controller;