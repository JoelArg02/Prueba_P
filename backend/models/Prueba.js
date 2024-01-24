  const poolc = require('../config/db'); // Asegúrate de que la ruta sea correcta

  const Prueba = {};

  Prueba.getPruebas = callback => {
    const query = `
      SELECT *
      FROM pruebas;
    `;
    poolc.query(query, callback);
  }

  Prueba.crearPrueba = (pruebaData, callback) => {
    
    const query = `
      INSERT INTO pruebas (numero_preguntas, duracion, fecha_inicio)
      VALUES ($1, $2, $3)
      RETURNING id_prueba;
    `;
    const { numero_preguntas, duracion, fecha_inicio } = pruebaData;
    poolc.query(query, [numero_preguntas, duracion, fecha_inicio], (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results.rows[0].id_prueba); 
      }
    });
  };
  

  module.exports = Prueba;
