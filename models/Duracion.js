const conexion = require('../database/db');


const Duracion = {
    create: (duracion, callback) => {
        const sql = 'INSERT INTO duracion (nombre) VALUES ( ?)';
        conexion.query(sql, [duracion], callback);
    },



    findAll: (callback) => {
        const sql = `SELECT 
  id_duracion, nombre , alta
FROM 
     duracion
WHERE
    alta= 1;`;
        conexion.query(sql, callback);
    },
    findAll0: (callback) => {
        const sql = `SELECT 
  id_duracion, nombre, alta
FROM 
     duracion
WHERE
    alta= 0;`;
        conexion.query(sql, callback);
    }, 

    findId: (id, callback) => {
        const sql = `SELECT 
        id_duracion,
        nombre,
        alta
FROM 
     duracion
WHERE
    id_duracion = ?;`;
        conexion.query(sql, [id], callback);
    },
    update: (id, duracion, callback) => {
       
        const sql = `UPDATE duracion SET nombre = ?  WHERE id_duracion = ${id}`;
        conexion.query(sql, [duracion], callback);
    },
    delete: (id, callback) => {
        const sql = 'UPDATE duracion SET alta = 0 WHERE id_duracion = ?';
        conexion.query(sql, [id], callback);
    },
    alta: (id, callback) => {
        const sql = 'UPDATE duracion SET alta = 1 WHERE id_duracion = ?';
        conexion.query(sql, [id], callback);
    }
};

module.exports = Duracion;