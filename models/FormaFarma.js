const conexion = require('../database/db');


const FormaFarma = {
    create: (forma_fa, callback) => {
        const sql = 'INSERT INTO forma_farma (forma_fa) VALUES ( ?)';
        conexion.query(sql, [forma_fa], callback);
    },



    findAll: (callback) => {
        const sql = `SELECT 
  id_for_fa, forma_fa
FROM 
     forma_farma
WHERE
    alta= 1;`;
        conexion.query(sql, callback);
    },
    findAll0: (callback) => {
        const sql = `SELECT 
  id_for_fa, forma_fa
FROM 
     forma_farma
WHERE
    alta= 0;`;
        conexion.query(sql, callback);
    }, 

    findId: (id, callback) => {
        const sql = `SELECT 
        id_for_fa,
        forma_fa,
        alta
FROM 
     forma_farma
WHERE
    id_for_fa = ?;`;
        conexion.query(sql, [id], callback);
    },
    update: (id, forma_fa, callback) => {
       
        const sql = `UPDATE forma_farma SET forma_fa = ?  WHERE id_for_fa = ${id}`;
        conexion.query(sql, [forma_fa], callback);
    },
    delete: (id, callback) => {
        const sql = 'UPDATE forma_farma SET alta = 0 WHERE id_for_fa = ?';
        conexion.query(sql, [id], callback);
    },
    altaForm: (id, callback) => {
        const sql = 'UPDATE forma_farma SET alta = 1 WHERE id_for_fa = ?';
        conexion.query(sql, [id], callback);
    }
};

module.exports = FormaFarma;