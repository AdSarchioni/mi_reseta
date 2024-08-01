const conexion = require('../database/db');


const ObraSocial = {
    create: (nombre_obra, callback) => {
        const sql = 'INSERT INTO obra_social (nombre_obra) VALUES ( ?)';
        conexion.query(sql, [nombre_obra], callback);
    },



    findAll: (callback) => {
        const sql = `SELECT 
  id_obra_social, nombre_obra, alta
FROM 
     obra_social
WHERE
    alta= 1;`;
        conexion.query(sql, callback);
    },
    findAll0: (callback) => {
        const sql = `SELECT 
  id_obra_social, nombre_obra, alta
FROM 
     obra_social
WHERE
    alta= 0;`;
        conexion.query(sql, callback);
    }, 

    findId: (id, callback) => {
        const sql = `SELECT 
        id_obra_social,
        nombre_obra,
        alta
FROM 
     obra_social
WHERE
    id_obra_social = ?;`;
        conexion.query(sql, [id], callback);
    },
    update: (id, nombre_obra, callback) => {
       
        const sql = `UPDATE obra_social SET nombre_obra = ?  WHERE id_obra_social = ${id}`;
        conexion.query(sql, [nombre_obra], callback);
    },
    delete: (id, callback) => {
        const sql = 'UPDATE obra_social SET alta = 0 WHERE id_obra_social = ?';
        conexion.query(sql, [id], callback);
    },
    alta: (id, callback) => {
        const sql = 'UPDATE obra_social SET alta = 1 WHERE id_obra_social = ?';
        conexion.query(sql, [id], callback);
    }
};

module.exports = ObraSocial;