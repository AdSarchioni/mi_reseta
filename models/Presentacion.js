const conexion = require('../database/db');


const Presentacion = {
    create: (presentacion, callback) => {
        const sql = 'INSERT INTO presentacion (presentacion) VALUES ( ?)';
        conexion.query(sql, [presentacion], callback);
    },



    findAll: (callback) => {
        const sql = `SELECT 
  id_present, presentacion
FROM 
     presentacion
WHERE
    alta= 1;`;
        conexion.query(sql, callback);
    },
    findAll0: (callback) => {
        const sql = `SELECT 
  id_present, presentacion
FROM 
     presentacion
WHERE
    alta= 0;`;
        conexion.query(sql, callback);
    }, 

    findId: (id, callback) => {
        const sql = `SELECT 
        id_present,
        presentacion
        
FROM 
     presentacion
WHERE
    id_present = ?;`;
        conexion.query(sql, [id], callback);
    },
    update: (id, presentacion, callback) => {
       
        const sql = `UPDATE presentacion SET presentacion = ?  WHERE id_present = ${id}`;
        conexion.query(sql, [presentacion], callback);
    },
    delete: (id, callback) => {
        const sql = 'UPDATE presentacion SET alta = 0 WHERE id_present = ?';
        conexion.query(sql, [id], callback);
    },
    alta: (id, callback) => {
        const sql = 'UPDATE presentacion SET alta = 1 WHERE id_present = ?';
        conexion.query(sql, [id], callback);
    }
};

module.exports = Presentacion;