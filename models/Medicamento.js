const conexion = require('../database/db');


const Medicamento = {
    create: (id_reg_nac, nombre_generico, nombre_comercial, id_concent, id_for_fa, id_fam, id_present, callback) => {
        const sql = `INSERT INTO medicamentos (id_reg_nac, nombre_generico, nombre_comercial, id_concent, id_for_fa, id_fam, id_present) VALUES ( ?, ?, ?, ?, ?, ?, ?)`;
        conexion.query(sql, [id_reg_nac, nombre_generico, nombre_comercial, id_concent, id_for_fa, id_fam, id_present], callback);
    },



    findAll: (callback) => {
        const sql = `SELECT 
  id_reg_nac, nombre_generico, nombre_comercial, alta_med, id_concen, id_for_fa, id_fam, id_present
FROM 
     medicamentos
WHERE
    alta_med= 1;`;
        conexion.query(sql, callback);
    },
    findAll0: (callback) => {
        const sql = `SELECT 
  m.id_med AS id,
         m.id_reg_nac AS id_reg_nac,
         m.nombre_comercial AS nombre,
        m.nombre_generico AS nombre_generico,
         m.nombre_comercial AS nombre_comercial,
         m.alta_med AS alta_med,
         m.id_concent AS id_concent,  
         c.concentracion AS concentracion,
         m.id_for_fa AS id_for_fa,
         f.forma_fa AS forma_farma,
         m.id_present AS id_present,
        p.presentacion AS presentacion,
        m.id_fam AS id_fam,
         l.familia AS familia
        FROM medicamentos m 
        LEFT JOIN concentracion c
        ON m.id_concent = c.id_conc
            LEFT JOIN forma_farma f 
         ON m.id_for_fa = f.id_for_fa
          LEFT JOIN presentacion p 
        ON m.id_present = p.id_present
        LEFT JOIN familia l 
        ON m.id_fam = l.id_fam
WHERE
    alta_med= 0;`;
        conexion.query(sql, callback);
    }, 

    findId: (id, callback) => {
        const sql = `SELECT 
   m.id_med AS id,
         m.id_reg_nac AS id_reg_nac,
         m.nombre_comercial AS nombre,
        m.nombre_generico AS nombre_generico,
         m.nombre_comercial AS nombre_comercial,
         m.alta_med AS alta_med,
         m.id_concent AS id_concent,  
         c.concentracion AS concentracion,
         m.id_for_fa AS id_for_fa,
         f.forma_fa AS forma_farma,
         m.id_present AS id_present,
        p.presentacion AS presentacion,
        m.id_fam AS id_fam,
         l.familia AS familia
        FROM medicamentos m 
        LEFT JOIN concentracion c
        ON m.id_concent = c.id_conc
            LEFT JOIN forma_farma f 
         ON m.id_for_fa = f.id_for_fa
          LEFT JOIN presentacion p 
        ON m.id_present = p.id_present
        LEFT JOIN familia l 
        ON m.id_fam = l.id_fam
WHERE
    id_med = ?;`;
        conexion.query(sql, [id], callback);
    },

    update: (id, id_reg_nac, nombre_generico, nombre_comercial, id_concent, id_for_fa, id_fam, id_present, callback) => {
       
        const sql = `UPDATE medicamentos SET id_reg_nac =?, nombre_generico =?, nombre_comercial =?, id_concent =?, id_for_fa =?, id_fam =?, id_present =? WHERE id_med = ${id}`;
        conexion.query(sql, [id_reg_nac, nombre_generico, nombre_comercial, id_concent, id_for_fa, id_fam, id_present], callback);
    },
    delete: (id, callback) => {
        const sql = 'UPDATE medicamentos SET alta_med = 0 WHERE id_med = ?';
        conexion.query(sql, [id], callback);
    },
    alta: (id, callback) => {
        const sql = 'UPDATE medicamentos SET alta_med = 1 WHERE id_med = ?';
        conexion.query(sql, [id], callback);
    }
};

module.exports = Medicamento;