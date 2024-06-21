const conexion = require('../database/db');


const Pasiente = {
    create: (nombre, apellido, dni, fecha_nac, sexo, alta, id_plan, callback) => {
        const sql = 'INSERT INTO pasciente (nombre_pas, apellido_pas, dni_pas, fecha_nac_pas, sexo_pas, alta_pas, id_plan_obra_social) VALUES (?, ?, ?, ?, ?, ?, ?)';
        conexion.query(sql, [nombre, apellido, dni, fecha_nac, sexo, alta, id_plan], callback);
    },
    findAll: (callback) => {
        const sql = `SELECT id_pas, nombre_pas, apellido_pas, dni_pas, DATE_FORMAT(fecha_nac_pas, '%d-%m-%Y') AS fecha_nac_pas, sexo_pas, alta_pas, id_plan_obra_social FROM pasciente;
`;
        conexion.query(sql, callback);
    },
    findById: (id, callback) => {
        const sql = 'SELECT * FROM pasciente WHERE id_pas = ?';
        conexion.query(sql, [id], callback);
    },
    findByDni: (dni, callback) => {
        const sql = 'SELECT * FROM pasciente WHERE dni_pas = ?';
        conexion.query(sql, [dni], callback);
    },
    update: (id, nombre,apellido, dni, fecha_nac, sexo, alta, id_plan, callback) => {
        const sql = 'UPDATE pasciente SET nombre_pas = ?, apellido_pas = ?, dni_pas = ?, fecha_nac_pas = ?, sexo_pas = ?, alta_pas = ?, id_plan_obra_social = ?  WHERE id_pas = ?';
        conexion.query(sql, [id, nombre, apellido, dni, fecha_nac, sexo, alta, id_plan], callback);
    },
    delete: (id, callback) => {
        const sql = 'DELETE FROM pasciente WHERE id_pas = ?';
        conexion.query(sql, [id], callback);
    }
};

module.exports = Pasiente;