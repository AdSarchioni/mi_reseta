const conexion = require('../database/db');


const Refeps = {
    create: (numero, callback) => {
        const sql = 'INSERT INTO refers (numero) VALUES ( ?)';
        conexion.query(sql, [numero], callback);
    },

    findAll: (callback) => {
        const sql = `SELECT 
  id_refers, numero, alta
FROM 
    refers
WHERE
    alta= 1;`;
        conexion.query(sql, callback);
    },
    findAll0: (callback) => {
        const sql = `SELECT 
 id_refers, numero, alta
FROM 
     refers
WHERE
    alta= 0;`;
        conexion.query(sql, callback);
    }, 

    findId: (id, callback) => {
        const sql = `SELECT 
        id_refers,
        numero,
        alta
FROM 
     refers
WHERE
    id_refers = ?;`;
        conexion.query(sql, [id], callback);
    },
    update: (id, tipo_esp, callback) => {
       
        const sql = `UPDATE refers SET numero = ?  WHERE id_refers = ${id}`;
        conexion.query(sql, [tipo_esp], callback);
    },
    delete: (id, callback) => {
        const sql = 'UPDATE refers SET alta = 0 WHERE id_refers = ?';
        conexion.query(sql, [id], callback);
    },
    alta: (id, callback) => {
        const sql = 'UPDATE refers SET alta = 1 WHERE id_refers = ?';
        conexion.query(sql, [id], callback);
    }
};

module.exports = Refeps;