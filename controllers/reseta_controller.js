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












module.exports = controller;