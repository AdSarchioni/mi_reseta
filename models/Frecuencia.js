const conexion = require('../database/db');


const Frecuencia = {
    create: (frecuencia, callback) => {
        const sql = 'INSERT INTO frecuencia (nombre) VALUES ( ?)';
        conexion.query(sql, [frecuencia], callback);
    },



    findAll: (callback) => {
        const sql = `SELECT 
  id_frecuencia, nombre, alta
FROM 
     frecuencia
WHERE
    alta= 1;`;
        conexion.query(sql, callback);
    },
    findAll0: (callback) => {
        const sql = `SELECT 
  id_frecuencia, nombre, alta
FROM 
     frecuencia
WHERE
    alta= 0;`;
        conexion.query(sql, callback);
    }, 

    findId: (id, callback) => {
        const sql = `SELECT 
        id_frecuencia,
        nombre,
        alta
FROM 
     frecuencia
WHERE
    id_frecuencia = ?;`;
        conexion.query(sql, [id], callback);
    },
    update: (id, frecuencia, callback) => {
        console.log('id1' + id);
        const sql = `UPDATE frecuencia SET nombre = ?  WHERE id_frecuencia = ${id}`;
        conexion.query(sql, [frecuencia], callback);
    },
    delete: (id, callback) => {
        const sql = 'UPDATE frecuencia SET alta = 0 WHERE id_frecuencia = ?';
        conexion.query(sql, [id], callback);
    },
    alta: (id, callback) => {
        const sql = 'UPDATE frecuencia SET alta = 1 WHERE id_frecuencia = ?';
        conexion.query(sql, [id], callback);
    }
};

module.exports = Frecuencia;