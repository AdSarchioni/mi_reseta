const conexion = require('../database/db');


const Especialidad = {
    create: (tipo_esp, callback) => {
        const sql = 'INSERT INTO especialidad (tipo_esp) VALUES ( ?)';
        conexion.query(sql, [tipo_esp], callback);
    },

    findAll: (callback) => {
        const sql = `SELECT 
  id_especialidad, tipo_esp, alta
FROM 
     especialidad
WHERE
    alta= 1;`;
        conexion.query(sql, callback);
    },
    findAll0: (callback) => {
        const sql = `SELECT 
 id_especialidad, tipo_esp, alta
FROM 
     especialidad
WHERE
    alta= 0;`;
        conexion.query(sql, callback);
    }, 

    findId: (id, callback) => {
        const sql = `SELECT 
        id_especialidad,
        tipo_esp,
        alta
FROM 
     especialidad
WHERE
    id_especialidad = ?;`;
        conexion.query(sql, [id], callback);
    },
    update: (id, tipo_esp, callback) => {
       
        const sql = `UPDATE especialidad SET tipo_esp = ?  WHERE id_especialidad = ${id}`;
        conexion.query(sql, [tipo_esp], callback);
    },
    delete: (id, callback) => {
        const sql = 'UPDATE especialidad SET alta = 0 WHERE id_especialidad = ?';
        conexion.query(sql, [id], callback);
    },
    alta: (id, callback) => {
        const sql = 'UPDATE especialidad SET alta = 1 WHERE id_especialidad = ?';
        conexion.query(sql, [id], callback);
    }
};

module.exports = Especialidad;