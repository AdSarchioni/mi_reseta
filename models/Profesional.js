const conexion = require('../database/db');


const Profesional = {
    create: (
        id_refer, id_especialidad, matricula, nombre_prof, apellido_prof, dni_prof, 
        domicilio_prof, mail_prof, tel_prof, callback
      ) => {  
        conexion.beginTransaction((err) => {
          if (err) {
            console.error('Error starting transaction: ' + err.message);
            return callback(err);
          }
    
          const insertProfesionalSql = `
            INSERT INTO profesional (id_refer, nombre_prof, apellido_prof, dni_prof, domicilio_prof, mail_prof, tel_prof)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;
          const insertProfesionalValues = [
            id_refer, nombre_prof, apellido_prof, dni_prof, domicilio_prof, mail_prof, tel_prof
          ];
    
          conexion.query(insertProfesionalSql, insertProfesionalValues, (error, results) => {
            if (error) {
              return conexion.rollback(() => {
                console.error('Error al insertar en la tabla profesional: ' + error.message);
                return callback(error);
              });
            }
    
            const idProfesional = results.insertId;
    
            const insertProfEspecSql = `
              INSERT INTO prof_espec (id_prof, id_especialidad, matricula)
              VALUES (?, ?, ?)
            `;
            const insertProfEspecValues = [idProfesional, id_especialidad, matricula];
    
            conexion.query(insertProfEspecSql, insertProfEspecValues, (error) => {
              if (error) {
                return conexion.rollback(() => {
                  console.error('Error al insertar en la tabla prof_espec: ' + error.message);
                  return callback(error);
                });
              }
    
              conexion.commit((err) => {
                if (err) {
                  return conexion.rollback(() => {
                    console.error('Error al hacer commit de la transacción: ' + err.message);
                    return callback(err);
                  });
                }
    
                // Todo fue exitoso, llamar al callback sin error
                callback(null);
              });
            });
          });
        });
      }
    ,
     findAll: (callback) => {
    const sql = `SELECT 
    p.id_refer,
    p.id_prof,
    p.nombre_prof,
    p.apellido_prof,
    p.dni_prof,
    p.domicilio_prof,
    p.mail_prof,
    p.tel_prof,
    p.alta,
    e.id_especialidad,
    e.tipo_esp,
    pe.matricula,
    r.numero
FROM 
    profesional p
JOIN 
    prof_espec pe ON p.id_prof = pe.id_prof
JOIN 
    especialidad e ON pe.id_especialidad = e.id_especialidad
 JOIN 
    refers r  ON p.id_refer = r.id_refers
WHERE 
    p.alta = 1;`


    conexion.query(sql, callback);
},


    findAll0: (callback) => {
        const sql = `SELECT 
    p.id_refer,
    p.id_prof,
    p.nombre_prof,
    p.apellido_prof,
    p.dni_prof,
    p.domicilio_prof,
    p.mail_prof,
    p.tel_prof,
    p.alta,
    e.id_especialidad,
    e.tipo_esp,
    pe.matricula,
    r.numero
FROM 
    profesional p
JOIN 
    prof_espec pe ON p.id_prof = pe.id_prof
JOIN 
    especialidad e ON pe.id_especialidad = e.id_especialidad
 JOIN 
    refers r  ON p.id_refer = r.id_refers
WHERE 
    p.alta = 0;`
        conexion.query(sql, callback);
    },

    findById: (id, callback) => {
        const sql = `SELECT 
    p.id_refer,
    p.id_prof,
    p.nombre_prof,
    p.apellido_prof,
    p.dni_prof,
    p.domicilio_prof,
    p.mail_prof,
    p.tel_prof,
    p.alta,
    e.id_especialidad,
    e.tipo_esp,
    pe.matricula,
    r.numero
FROM 
    profesional p
JOIN 
    prof_espec pe ON p.id_prof = pe.id_prof
JOIN 
    especialidad e ON pe.id_especialidad = e.id_especialidad
 JOIN 
    refers r  ON p.id_refer = r.id_refers
WHERE 
    p.id_prof = ?;`
        conexion.query(sql, [id], callback);
    },
    findByDni: (dni, callback) => {
        const sql = 'SELECT * FROM profesional WHERE dni_prof = ?';
        conexion.query(sql, [dni], callback);
    },
    findByRefeps: (id_refer, callback) => {
      const sql = 'SELECT * FROM profesional WHERE id_refer = ?';
      conexion.query(sql, [id_refer], callback);
  },
  findByMatri: (matricula, callback) => {
    const sql = 'SELECT * FROM prof_espec WHERE matricula = ?';
    conexion.query(sql, [matricula], callback);
},
    update: (id,nomEdit, apellEdit, dniEdit, fechaEdit, sexoEdit, id_planE , callback) => {
        
        const sql = 'UPDATE profesional SET nombre_prof = ?, apellido_prof = ?, dni_prof = ?, fecha_nac_pas = ?, sexo_pas = ?, id_plan_obra_social = ?  WHERE id_pas = ?';
        conexion.query(sql, [nomEdit, apellEdit, dniEdit, fechaEdit, sexoEdit, id_planE , id], callback);
    },
    delete: (id, callback) => {
        const sql ='UPDATE profesional SET alta = 0 WHERE id_prof = ?' ;
        conexion.query(sql, [id], callback);
    },
    alta: (id, callback) => {
        const sql ='UPDATE profesional SET alta = 1 WHERE id_prof = ?' ;
        conexion.query(sql, [id], callback);
    }
};

module.exports = Profesional;