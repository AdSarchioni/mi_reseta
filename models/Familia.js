const conexion = require('../database/db');


const Familia = {
    create: (familia, callback) => {
        const sql = 'INSERT INTO familia (familia) VALUES ( ?)';
        conexion.query(sql, [familia], callback);
    },



    findAll: (callback) => {
        const sql = `SELECT 
  id_fam, familia
FROM 
     familia
WHERE
    alta= 1;`;
        conexion.query(sql, callback);
    },
    findAll0: (callback) => {
        const sql = `SELECT 
  id_fam, familia
FROM 
     familia
WHERE
    alta= 0;`;
        conexion.query(sql, callback);
    }, 

    findId: (id, callback) => {
        const sql = `SELECT 
        id_fam,
        familia,
        alta
FROM 
     familia
WHERE
    id_fam = ?;`;
        conexion.query(sql, [id], callback);
    },
    update: (id, familia, callback) => {
       
        const sql = `UPDATE familia SET familia = ?  WHERE id_fam = ${id}`;
        conexion.query(sql, [familia], callback);
    },
    delete: (id, callback) => {
        const sql = 'UPDATE familia SET alta = 0 WHERE id_fam = ?';
        conexion.query(sql, [id], callback);
    },
    altaForm: (id, callback) => {
        const sql = 'UPDATE familia SET alta = 1 WHERE id_fam = ?';
        conexion.query(sql, [id], callback);
    }
};

module.exports = Familia;