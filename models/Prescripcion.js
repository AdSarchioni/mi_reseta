const conexion = require('../database/db');


const Prescripcion = {

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
        const sql = `SELECT *
  
FROM 
     prescripcion
WHERE
    alta= 0;`;
        conexion.query(sql, callback);
    }, 

    findId: (id, callback) => {
        const sql = `SELECT 
       *
FROM 
     prescripcion
WHERE
    id_presc = ?;`;
        conexion.query(sql, [id], callback);
    },
    update: (id, familia, callback) => {
       
        const sql = `UPDATE familia SET familia = ?  WHERE id_fam = ${id}`;
        conexion.query(sql, [familia], callback);
    },
    delete: (id, callback) => {
        const sql = 'UPDATE familia SET alta = 0 WHERE id_fam = ?';
        conexion.query(sql, [id], callback);
    },
    altaForm: (id, callback) => {
        const sql = 'UPDATE familia SET alta = 1 WHERE id_fam = ?';
        conexion.query(sql, [id], callback);
    }
};

module.exports = Prescripcion;