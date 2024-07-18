const conexion = require('../database/db');


const Prescripcion = {

    findAll: (callback) => {
        const sql = `SELECT     
p.id_presc,
p.id_prof,
prof.id_refer,
esp.tipo_esp,
proes.matricula,
ref.numero AS refeps,
prof.nombre_prof,
prof.apellido_prof,
pas.*,
prest.id_presta,
prest.nombre AS prestacion,
pl.*,
ob.nombre_obra,
ad.*,
ca.nombre AS cantidad,
dos.nombre AS dosis,
du.nombre AS duracion,
fr.nombre AS frecuencia,
med.*,
con.concentracion,
fa.familia,
ff.forma_fa,
pr.presentacion
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
refers ref ON prof.id_refer = ref.id_refers
LEFT JOIN
administracion ad ON pad.id_admin = ad.id_administracion
LEFT JOIN
cantidad ca ON ad.id_cantidad = ca.id_cantidad
LEFT JOIN
dosis dos ON ad.id_dosis = dos.id_dosis
LEFT JOIN
duracion du ON ad.id_duracion = du.id_duracion
LEFT JOIN
frecuencia fr ON ad.id_frecuencia = fr.id_frecuencia
LEFT JOIN
medicamentos med ON ad.id_med = med.id_med
LEFT JOIN
concentracion con ON med.id_concent = con.id_conc
LEFT JOIN
familia fa ON med.id_fam = fa.id_fam
LEFT JOIN
forma_farma ff ON med.id_for_fa = ff.id_for_fa
LEFT JOIN
presentacion pr ON med.id_present = pr.id_present
LEFT JOIN 
    prescripcion_prestacion pp ON p.id_presc = pp.id_presc
LEFT JOIN 
    prestacion prest ON pp.id_presta = prest.id_presta
LEFT JOIN
plan_obra_social pl  ON pas.id_plan_obra_social = pl.id_plan_obra_social
LEFT JOIN
obra_social ob ON pl.id_plan_obra_social = ob.id_obra_social
WHERE
p.alta = 1;`;
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