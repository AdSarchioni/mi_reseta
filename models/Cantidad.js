const conexion = require('../database/db');


const Cantidad = {
    create: (cantidad, callback) => {
        const sql = 'INSERT INTO cantidad (nombre) VALUES ( ?)';
        conexion.query(sql, [cantidad], callback);
    },
    findAll: (callback) => {
        const sql = `SELECT 
  id_cantidad, nombre, alta
FROM 
     cantidad
WHERE
    alta= 1;`;
        conexion.query(sql, callback);
    },
    findAll0: (callback) => {
        const sql = `SELECT 
  id_cantidad, nombre, alta
FROM 
     cantidad
WHERE
    alta= 0;`;
        conexion.query(sql, callback);
    }, 

    findId: (id, callback) => {
        const sql = `SELECT 
        id_cantidad,
        nombre,
        alta
        
FROM 
     cantidad
WHERE
    id_cantidad = ?;`;
        conexion.query(sql, [id], callback);
    },
    update: (id, cantidad, callback) => {
       
        const sql = `UPDATE cantidad SET nombre = ?  WHERE id_cantidad = ${id}`;
        conexion.query(sql, [cantidad], callback);
    },
    delete: (id, callback) => {
        const sql = 'UPDATE cantidad SET alta = 0 WHERE id_cantidad = ?';
        conexion.query(sql, [id], callback);
    },
    alta: (id, callback) => {
        const sql = 'UPDATE cantidad SET alta = 1 WHERE id_cantidad = ?';
        conexion.query(sql, [id], callback);
    }
};

module.exports = Cantidad;