const conexion = require('../database/db');

const controller = {};



controller.crea_reseta = (req, res) => {

    res.render('crear_reseta/crear_reseta', { data: '' });
}



controller.paraListPas = (req, res) => {
    const idCombo1 = req.params.valorImput1;
    conexion.query(`SELECT * FROM  pasciente WHERE nombre_pas = '${idCombo1}'`, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener opciones del Combo Box 1' });
        } else {
            res.json(results);
            console.log("Resultados de la consulta:", JSON.stringify(results, null, 2))
        }
    });

}
controller.paraListProf = (req, res) => {
    const idCombo1 = req.params.valorImput1;
    conexion.query(`SELECT * FROM  profesional WHERE nombre_prof = '${idCombo1}'`, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener opciones del Combo Box 1' });
        } else {
            res.json(results);
            console.log("Resultados de la consulta:", JSON.stringify(results, null, 2))
        }
    });

}
controller.save = (req, res) => {
    const data = req.body;

res.redirect('crea_reseta')
   
    
          console.log("Resultados del submit:", JSON.stringify(data, null, 2))
}

controller.getPrestaciones = (req, res) => {
    conexion.query('SELECT id_presta,nombre FROM prestacion', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};
controller.getPrestacionesId = (req, res) => {
    conexion.query('SELECT id_presta AS nombre FROM prestacion', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};


controller.cargarMedDataList = (req, res) => {
    const query = 'SELECT id_med AS nombre,m.nombre_generico AS nombre_generico, m.nombre_comercial AS nombre_comercial, m.id_concent AS id_concent, c.concentracion AS concentracion, m.id_for_fa AS id_for_fa, f.forma_fa AS forma_farma FROM medicamentos m LEFT JOIN concentracion c ON m.id_concent = c.id_conc LEFT JOIN forma_farma f ON m.id_for_fa = f.id_for_fa;';
conexion.query(query, (err, results) => {
      if (err) {
        res.status(500).send('Error querying the database');
        return;
      }
    
      res.json(results);
      
      console.log("Resultados del submit:", JSON.stringify(results, null, 2))
    });
  };
  controller.getDosisList = (req, res) => {
    conexion.query('SELECT nombre FROM dosis', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};

controller.getCantidadList = (req, res) => {
    conexion.query('SELECT nombre FROM cantidad', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};

controller.getFrecuenciaList = (req, res) => {
    conexion.query('SELECT nombre FROM frecuencia', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};

controller.getDuracionList = (req, res) => {
    conexion.query('SELECT nombre FROM duracion', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};







module.exports = controller;