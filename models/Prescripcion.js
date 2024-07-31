const conexion = require('../database/db');


const Prescripcion = {

    findAllDni: (dni, callback) => {
        const sql = ` SELECT 
    p.id_presc,
    prof.nombre_prof ,
    prof.apellido_prof,
    esp.tipo_esp,
    pas.nombre_pas,
    pas.apellido_pas,
    p.diagnostico,
    GROUP_CONCAT(DISTINCT prest.nombre SEPARATOR ', ') AS prestaciones,
    GROUP_CONCAT(DISTINCT med.nombre_generico SEPARATOR ', ') AS medicamentos,
    GROUP_CONCAT(DISTINCT ob.nombre_obra SEPARATOR ', ') AS obras_sociales
 
FROM 
    prescripcion p
JOIN 
    pasciente pas ON p.id_pas = pas.id_pas
JOIN 
    profesional prof ON p.id_prof = prof.id_prof
JOIN
    presc_admin pad ON p.id_presc = pad.id_presc
LEFT JOIN
     prof_espec proes ON prof.id_prof = proes.id_prof
LEFT JOIN
     especialidad esp ON proes.id_especialidad = esp.id_especialidad

LEFT JOIN
    administracion ad ON pad.id_admin = ad.id_administracion

LEFT JOIN
    medicamentos med ON ad.id_med = med.id_med

LEFT JOIN 
    prescripcion_prestacion pp ON p.id_presc = pp.id_presc
LEFT JOIN 
    prestacion prest ON pp.id_presta = prest.id_presta
LEFT JOIN
    plan_obra_social pl  ON pas.id_plan_obra_social = pl.id_plan_obra_social
LEFT JOIN
    obra_social ob ON pl.id_plan_obra_social = ob.id_obra_social
WHERE
     p.alta = 1 AND prof.dni_prof = ?
GROUP BY 
       p.id_presc, prof.nombre_prof, prof.apellido_prof, esp.tipo_esp, pas.nombre_pas, pas.apellido_pas, p.diagnostico;
`;
        conexion.query(sql, [dni], callback);
    },
    findAll: (callback) => {
        const sql = ` SELECT 
    p.id_presc,
    prof.nombre_prof ,
    prof.apellido_prof,
    esp.tipo_esp,
    pas.nombre_pas,
    pas.apellido_pas,
    p.diagnostico,
    GROUP_CONCAT(DISTINCT prest.nombre SEPARATOR ', ') AS prestaciones,
    GROUP_CONCAT(DISTINCT med.nombre_generico SEPARATOR ', ') AS medicamentos,
    GROUP_CONCAT(DISTINCT ob.nombre_obra SEPARATOR ', ') AS obras_sociales
 
FROM 
    prescripcion p
JOIN 
    pasciente pas ON p.id_pas = pas.id_pas
JOIN 
    profesional prof ON p.id_prof = prof.id_prof
JOIN
    presc_admin pad ON p.id_presc = pad.id_presc
LEFT JOIN
     prof_espec proes ON prof.id_prof = proes.id_prof
LEFT JOIN
     especialidad esp ON proes.id_especialidad = esp.id_especialidad

LEFT JOIN
    administracion ad ON pad.id_admin = ad.id_administracion

LEFT JOIN
    medicamentos med ON ad.id_med = med.id_med

LEFT JOIN 
    prescripcion_prestacion pp ON p.id_presc = pp.id_presc
LEFT JOIN 
    prestacion prest ON pp.id_presta = prest.id_presta
LEFT JOIN
    plan_obra_social pl  ON pas.id_plan_obra_social = pl.id_plan_obra_social
LEFT JOIN
    obra_social ob ON pl.id_plan_obra_social = ob.id_obra_social
WHERE
     p.alta = 1 
GROUP BY 
       p.id_presc, prof.nombre_prof, prof.apellido_prof, esp.tipo_esp, pas.nombre_pas, pas.apellido_pas, p.diagnostico;
`;
        conexion.query(sql, callback);
    },
    findAll0: (callback) => {
        const sql = `SELECT 
    p.id_presc,
    prof.nombre_prof ,
    prof.apellido_prof,
    esp.tipo_esp,
    pas.nombre_pas,
    pas.apellido_pas,
    p.diagnostico,
    GROUP_CONCAT(DISTINCT prest.nombre SEPARATOR ', ') AS prestaciones,
    GROUP_CONCAT(DISTINCT med.nombre_generico SEPARATOR ', ') AS medicamentos,
    GROUP_CONCAT(DISTINCT ob.nombre_obra SEPARATOR ', ') AS obras_sociales
 
FROM 
    prescripcion p
JOIN 
    pasciente pas ON p.id_pas = pas.id_pas
JOIN 
    profesional prof ON p.id_prof = prof.id_prof
JOIN
    presc_admin pad ON p.id_presc = pad.id_presc
LEFT JOIN
     prof_espec proes ON prof.id_prof = proes.id_prof
LEFT JOIN
     especialidad esp ON proes.id_especialidad = esp.id_especialidad

LEFT JOIN
    administracion ad ON pad.id_admin = ad.id_administracion

LEFT JOIN
    medicamentos med ON ad.id_med = med.id_med

LEFT JOIN 
    prescripcion_prestacion pp ON p.id_presc = pp.id_presc
LEFT JOIN 
    prestacion prest ON pp.id_presta = prest.id_presta
LEFT JOIN
    plan_obra_social pl  ON pas.id_plan_obra_social = pl.id_plan_obra_social
LEFT JOIN
    obra_social ob ON pl.id_plan_obra_social = ob.id_obra_social
WHERE
     p.alta = 0 
GROUP BY 
       p.id_presc, prof.nombre_prof, prof.apellido_prof, esp.tipo_esp, pas.nombre_pas, pas.apellido_pas, p.diagnostico;
`;
        conexion.query(sql, callback);
    },
    findAll0Dni: (dni, callback) => {
        const sql = `SELECT 
    p.id_presc,
    prof.nombre_prof ,
    prof.apellido_prof,
    esp.tipo_esp,
    pas.nombre_pas,
    pas.apellido_pas,
    p.diagnostico,
    GROUP_CONCAT(DISTINCT prest.nombre SEPARATOR ', ') AS prestaciones,
    GROUP_CONCAT(DISTINCT med.nombre_generico SEPARATOR ', ') AS medicamentos,
    GROUP_CONCAT(DISTINCT ob.nombre_obra SEPARATOR ', ') AS obras_sociales
 
FROM 
    prescripcion p
JOIN 
    pasciente pas ON p.id_pas = pas.id_pas
JOIN 
    profesional prof ON p.id_prof = prof.id_prof
JOIN
    presc_admin pad ON p.id_presc = pad.id_presc
LEFT JOIN
     prof_espec proes ON prof.id_prof = proes.id_prof
LEFT JOIN
     especialidad esp ON proes.id_especialidad = esp.id_especialidad

LEFT JOIN
    administracion ad ON pad.id_admin = ad.id_administracion

LEFT JOIN
    medicamentos med ON ad.id_med = med.id_med

LEFT JOIN 
    prescripcion_prestacion pp ON p.id_presc = pp.id_presc
LEFT JOIN 
    prestacion prest ON pp.id_presta = prest.id_presta
LEFT JOIN
    plan_obra_social pl  ON pas.id_plan_obra_social = pl.id_plan_obra_social
LEFT JOIN
    obra_social ob ON pl.id_plan_obra_social = ob.id_obra_social
WHERE
     p.alta = 0 AND prof.dni_prof=?
GROUP BY 
       p.id_presc, prof.nombre_prof, prof.apellido_prof, esp.tipo_esp, pas.nombre_pas, pas.apellido_pas, p.diagnostico;
`;
        conexion.query(sql, [dni], callback);
    },
    findId: (id, callback) => {
        const sqlPres = `
            SELECT
                pr.id_presta,
                pr.nombre AS prestacion
            FROM 
                prescripcion p
            JOIN
                prescripcion_prestacion pp ON p.id_presc = pp.id_presc
            LEFT JOIN
                prestacion pr ON pp.id_presta = pr.id_presta 
            WHERE
                p.id_presc = ?;
        `;

        const sqlMed = `
            SELECT
                m.*,
                ad.*,
                can.nombre AS cantidad,
                du.nombre AS duracion,
                dos.nombre AS dosis,
                fr.nombre AS frecuencia,
                pr.presentacion,
                co.concentracion,
                fa.familia,
                ff.forma_fa
            FROM 
                prescripcion p
            JOIN
                presc_admin pa ON p.id_presc = pa.id_presc
            LEFT JOIN
                administracion ad ON pa.id_admin = ad.id_administracion
            JOIN
                medicamentos m ON ad.id_med = m.id_med
            JOIN
                concentracion co ON m.id_concent = co.id_conc
            JOIN
                familia fa ON m.id_fam = fa.id_fam
            JOIN
                forma_farma ff ON m.id_for_fa = ff.id_for_fa
            JOIN
                presentacion pr ON m.id_present = pr.id_present
            JOIN
                cantidad can ON ad.id_cantidad = can.id_cantidad
            JOIN
                duracion du ON ad.id_duracion = du.id_duracion
            JOIN
                dosis dos ON ad.id_dosis = dos.id_dosis
            JOIN
                frecuencia fr ON ad.id_frecuencia = fr.id_frecuencia
            WHERE
                p.id_presc = ?
        `;

        const sqlProfPas = `
          SELECT 
                p.*, 
                DATE_FORMAT(p.fecha_pres, '%d-%m-%Y') AS fecha_presc,
                pro.*, 
                pas.*,
                DATE_FORMAT(pas.fecha_nac_pas, '%d-%m-%Y') AS fecha_nac_pac,
                pe.*,
                es.*,
                re.*,
                pobs.*,
                obs.*
            FROM 
                prescripcion p
            JOIN 
                profesional pro ON p.id_prof = pro.id_prof
            LEFT JOIN
                refers re ON Pro.id_refer = re.id_refers
            JOIN 
                pasciente pas ON p.id_pas = pas.id_pas
            LEFT JOIN
                plan_obra_social pobs ON pas.id_plan_obra_social = pobs.id_plan_obra_social
            LEFT JOIN
                 obra_social obs ON pobs.id_obra_social = obs.id_obra_social  
            JOIN
                prof_espec pe ON p.id_prof =pe.id_prof
            LEFT JOIN 
                especialidad es ON pe.id_especialidad = es.id_especialidad
    
            WHERE 
                p.id_presc = ?;
        `;

        conexion.query(sqlPres, [id], (err, resultPres) => {
            if (err) return callback(err);

            conexion.query(sqlMed, [id], (err, resultMed) => {
                if (err) return callback(err);

                conexion.query(sqlProfPas, [id], (err, resultProfPas) => {
                    if (err) return callback(err);

                    const result = {
                        prestaciones: resultPres,
                        medicamentos: resultMed,
                        profPas: resultProfPas
                    };
                    callback(null, result);
                });
            });
        });
    },


    alta: (id, callback) => {
        const sql = `UPDATE prescripcion SET alta = 1  WHERE id_presc = ?`;
        conexion.query(sql, [id], callback);
    },
    delete : (id, callback) => {
        const sql = 'UPDATE prescripcion SET alta = 0 WHERE id_presc = ?';
        conexion.query(sql, [id], callback);
    }
};

module.exports = Prescripcion;