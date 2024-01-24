const poolc = require("../config/db"); // Asegúrate de que la ruta sea correcta

const Preguntas = {};

Preguntas.getPreguntas = (callback) => {
  const query = `
    SELECT *
    FROM preguntas;
  `;
  poolc.query(query, callback);
};

Preguntas.getPreguntaByIdPrueba = (id, callback) => {
  const query = `
        SELECT *
        FROM preguntas
        WHERE id_prueba = $1;
    `;
  poolc.query(query, [id], callback);
};

Preguntas.createPregunta = (preguntaData, callback) => {
  console.log("Datos recibidos para crear pregunta:", preguntaData);

  // Convertir id_prueba y respuesta_correcta a enteros
  const id_prueba = parseInt(preguntaData.id_prueba, 10);
  const respuesta_correcta = parseInt(preguntaData.respuesta_correcta, 10);

  // Verifica si id_prueba o respuesta_correcta no son números válidos
  if (isNaN(id_prueba) || isNaN(respuesta_correcta)) {
    return callback(
      "id_prueba o respuesta_correcta no son números válidos",
      null
    );
  }

  const query = `
    INSERT INTO preguntas (id_prueba, enunciado, opciones, respuesta_correcta)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const valores = [
    id_prueba,
    preguntaData.enunciado,
    preguntaData.opciones,
    respuesta_correcta,
  ];

  console.log("Valores para la inserción de la pregunta:", valores);

  poolc.query(query, valores, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results.rows[0]);
    }
  });
};

module.exports = Preguntas;
