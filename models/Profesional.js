const conexion = require('../database/db');


const Profesional = {
    create: (especialidad,matricula,id_refer,nombre_prof, apellido_prof, dni_prof, domicilio_prof,mail_prof, alta, callback) => {
        const sql = 'INSERT INTO pasciente (especialidad,matricula,id_refer,nombre_prof, apellido_prof, dni_prof, domicilio_prof,mail_prof, alta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        conexion.query(sql, [especialidad,matricula,id_refer,nombre_prof, apellido_prof, dni_prof, domicilio_prof,mail_prof, alta], callback);
    },
     findAll: (callback) => {
    const sql = `SELECT 
    p.id_refer,
    p.id_prof,
    p.nombre_prof,
    p.apellido_prof,
    p.dni_prof,
    p.domicilio_prof,
    p.mail_prof,
    p.tel_prof,
    p.alta,
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
    p.alta = 1;`


    conexion.query(sql, callback);
},


    findAll0: (callback) => {
        const sql = `SELECT 
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
    alta = 0;`
        conexion.query(sql, callback);
    },
    findAll00: (callback) => {
        const sql = `SELECT 
     p.id_pas AS id_pas,
     p.nombre_pas AS nombre_pas, 
     p.apellido_pas AS apellido_pas, 
     p.dni_pas AS dni_pas,
     DATE_FORMAT(fecha_nac_pas, '%d-%m-%Y') AS fecha_nac_pas,
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
    obra_social o ON pl.id_obra_social = o.id_obra_social
WHERE
    p.alta_pas = 0;`;
        conexion.query(sql, callback);
    },
    findById: (id, callback) => {
        const sql = `SELECT 
        p.id_pas AS id_pas,
        p.nombre_pas AS nombre_pas, 
        p.apellido_pas AS apellido_pas, 
        p.dni_pas AS dni_pas,
        DATE_FORMAT(fecha_nac_pas, '%Y-%m-%d') AS fecha_nac_pas,
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
       obra_social o ON pl.id_obra_social = o.id_obra_social
   WHERE
       p.id_pas = ?;`;
        conexion.query(sql, [id], callback);
    },
    findByDni: (dni, callback) => {
        const sql = 'SELECT * FROM pasciente WHERE dni_pas = ?';
        conexion.query(sql, [dni], callback);
    },
    update: (id,nomEdit, apellEdit, dniEdit, fechaEdit, sexoEdit, id_planE , callback) => {
        
        const sql = 'UPDATE pasciente SET nombre_pas = ?, apellido_pas = ?, dni_pas = ?, fecha_nac_pas = ?, sexo_pas = ?, id_plan_obra_social = ?  WHERE id_pas = ?';
        conexion.query(sql, [nomEdit, apellEdit, dniEdit, fechaEdit, sexoEdit, id_planE , id], callback);
    },
    delete: (id, callback) => {
        const sql ='UPDATE pasciente SET alta_pas = 0 WHERE id_pas = ?' ;
        conexion.query(sql, [id], callback);
    },
    altaPas: (id, callback) => {
        const sql ='UPDATE pasciente SET alta_pas = 1 WHERE id_pas = ?' ;
        conexion.query(sql, [id], callback);
    }
};

module.exports = Profesional;