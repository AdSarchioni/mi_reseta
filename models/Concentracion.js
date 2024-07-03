const conexion = require('../database/db');


const Concentracion = {
    create: (concentracion, callback) => {
        const sql = 'INSERT INTO concentracion (concentracion) VALUES ( ?)';
        conexion.query(sql, [concentracion], callback);
    },



    findAll: (callback) => {
        const sql = `SELECT 
  id_conc,concentracion,alta
FROM 
     concentracion
WHERE
    alta= 1;`;
        conexion.query(sql, callback);
    },
    findAll0: (callback) => {
        const sql = `SELECT 
  id_conc,concentracion,alta
FROM 
     concentracion
WHERE
    alta= 0;`;
        conexion.query(sql, callback);
    }, 

    findId: (id, callback) => {
        const sql = `SELECT 
        id_conc,
        concentracion,
        alta
FROM 
     concentracion
WHERE
    id_conc = ?;`;
        conexion.query(sql, [id], callback);
    },
    update: (id, concentracion, callback) => {
        console.log('id1' + id);
        const sql = `UPDATE concentracion SET concentracion = ?  WHERE id_conc = ${id}`;
        conexion.query(sql, [concentracion], callback);
    },
    delete: (id_conc, callback) => {
        const sql = 'UPDATE concentracion SET alta = 0 WHERE id_conc = ?';
        conexion.query(sql, [id_conc], callback);
    },
    altaConc: (id, callback) => {
        const sql = 'UPDATE concentracion SET alta = 1 WHERE id_conc = ?';
        conexion.query(sql, [id], callback);
    }
};

module.exports = Concentracion;