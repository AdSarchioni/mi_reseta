const conexion = require('../database/db');


const Dosis = {
    create: (dosis, callback) => {
        const sql = 'INSERT INTO dosis (nombre) VALUES ( ?)';
        conexion.query(sql, [dosis], callback);
    },



    findAll: (callback) => {
        const sql = `SELECT 
  id_dosis, nombre, alta
FROM 
     dosis
WHERE
    alta= 1;`;
        conexion.query(sql, callback);
    },
    findAll0: (callback) => {
        const sql = `SELECT 
  id_dosis, nombre, alta
FROM 
     dosis
WHERE
    alta= 0;`;
        conexion.query(sql, callback);
    }, 

    findId: (id, callback) => {
        const sql = `SELECT 
        id_dosis,
        nombre,
        alta
FROM 
     dosis
WHERE
    id_dosis = ?;`;
        conexion.query(sql, [id], callback);
    },
    update: (id, dosis, callback) => {
        console.log('id1' + id);
        const sql = `UPDATE dosis SET nombre = ?  WHERE id_dosis = ${id}`;
        conexion.query(sql, [dosis], callback);
    },
    delete: (id_dos, callback) => {
        const sql = 'UPDATE dosis SET alta = 0 WHERE id_dosis = ?';
        conexion.query(sql, [id_dos], callback);
    },
    alta: (id, callback) => {
        const sql = 'UPDATE dosis SET alta = 1 WHERE id_dosis = ?';
        conexion.query(sql, [id], callback);
    }
};

module.exports = Dosis;