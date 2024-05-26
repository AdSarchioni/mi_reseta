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



controller.cargarMedDataList = (req, res) => {
    const query = 'SELECT m.nombre_comercial AS nombre_comercial, m.id_concent AS id_concent, c.concentracion AS concentracion, m.id_for_fa AS id_for_fa, f.forma_fa AS forma_farma FROM medicamentos m LEFT JOIN concentracion c ON m.id_concent = c.id_conc LEFT JOIN forma_farma f ON m.id_for_fa = f.id_for_fa;';
conexion.query(query, (err, results) => {
      if (err) {
        res.status(500).send('Error querying the database');
        return;
      }
    
      res.json(results);
      
      console.log("Resultados del submit:", JSON.stringify(results, null, 2))
    });
  };








module.exports = controller;