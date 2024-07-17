const conexion = require('../database/db');


const Prescripcion = {

    findAll: (callback) => {
        const sql = `SELECT *
FROM 
     prescripcion
WHERE
    alta= 1;`;
        conexion.query(sql, callback);
    },
    findAll0: (callback) => {
        const sql = `SELECT *
  
FROM 
     prescripcion
WHERE
    alta= 0;`;
        conexion.query(sql, callback);
    }, 

    findId: (id, callback) => {
        const sql = `SELECT 
       *
FROM 
     prescripcion
WHERE
    id_presc = ?;`;
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

module.exports = Prescripcion;