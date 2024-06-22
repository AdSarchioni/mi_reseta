const conexion = require('../database/db');


const Pasiente = {
    create: (nombre, apellido, dni, fecha_nac, sexo, alta, id_plan, callback) => {
        const sql = 'INSERT INTO pasciente (nombre_pas, apellido_pas, dni_pas, fecha_nac_pas, sexo_pas, alta_pas, id_plan_obra_social) VALUES (?, ?, ?, ?, ?, ?, ?)';
        conexion.query(sql, [nombre, apellido, dni, fecha_nac, sexo, alta, id_plan], callback);
    },
     findAllPlans: (callback) => {
    const sql = `
SELECT 
    plan_obra_social.id_plan_obra_social AS id_plan,
    plan_obra_social.tipo_plan,
    plan_obra_social.id_obra_social AS plan_id_obra,
    obra_social.id_obra_social AS obra_id,
    obra_social.nombre_obra
FROM 
    plan_obra_social
JOIN 
    obra_social 
ON 
    plan_obra_social.id_obra_social = obra_social.id_obra_social;
    `;
    conexion.query(sql, callback);
},


    findAll: (callback) => {
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
    obra_social o ON pl.id_obra_social = o.id_obra_social;`;
        conexion.query(sql, callback);
    },
    findById: (id, callback) => {
        const sql = 'SELECT * FROM pasciente WHERE id_pas = ?';
        conexion.query(sql, [id], callback);
    },
    findByDni: (dni, callback) => {
        const sql = 'SELECT * FROM pasciente WHERE dni_pas = ?';
        conexion.query(sql, [dni], callback);
    },
    update: (id, nombre, apellido, dni, fecha_nac, sexo, alta, id_plan, callback) => {
        const sql = 'UPDATE pasciente SET nombre_pas = ?, apellido_pas = ?, dni_pas = ?, fecha_nac_pas = ?, sexo_pas = ?, alta_pas = ?, id_plan_obra_social = ?  WHERE id_pas = ?';
        conexion.query(sql, [id, nombre, apellido, dni, fecha_nac, sexo, alta, id_plan], callback);
    },
    delete: (id, callback) => {
        const sql = 'DELETE FROM pasciente WHERE id_pas = ?';
        conexion.query(sql, [id], callback);
    }
};

module.exports = Pasiente;