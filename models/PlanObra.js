const conexion = require('../database/db');


const PlanObra = {
    create: (tipo_plan, id_obra_social, callback) => {
        const sql = 'INSERT INTO plan_obra_social (tipo_plan, id_obra_social) VALUES ( ?, ?)';
        conexion.query(sql, [tipo_plan, id_obra_social], callback);
    },



    findAll: (callback) => {
        const sql = `SELECT 
    pos.*,
    os.*
FROM
    plan_obra_social pos
JOIN
    obra_social os ON pos.id_obra_social = os.id_obra_social
WHERE
    pos.alta = 1;`;
        conexion.query(sql, callback);
    },
    findAll0: (callback) => {
        const sql = `SELECT 
    pos.*,
    os.*
FROM
    plan_obra_social pos
JOIN
    obra_social os ON pos.id_obra_social = os.id_obra_social
WHERE
    pos.alta = 0;`;
        conexion.query(sql, callback);
    }, 

    findId: (id, callback) => {
        const sql = `SELECT 
    pos.*,
    os.*
FROM
    plan_obra_social pos
JOIN
    obra_social os ON pos.id_obra_social = os.id_obra_social
WHERE
    pos.id_plan_obra_social = ? ;`;
        conexion.query(sql, [id], callback);
    },
    update: (id,tipo_plan ,id_obra_social, callback) => {
       
        const sql = `UPDATE plan_obra_social SET tipo_plan = ?, id_obra_social= ?  WHERE id_plan_obra_social = ${id}`;
        conexion.query(sql, [tipo_plan, id_obra_social], callback);
    },
    delete: (id, callback) => {
        const sql = 'UPDATE plan_obra_social SET alta = 0 WHERE id_plan_obra_social = ?';
        conexion.query(sql, [id], callback);
    },
    alta: (id, callback) => {
        const sql = 'UPDATE plan_obra_social SET alta = 1 WHERE id_plan_obra_social = ?';
        conexion.query(sql, [id], callback);
    }
};

module.exports = PlanObra;