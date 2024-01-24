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
  const query = `
    INSERT INTO preguntas (id_prueba, enunciado, opciones, respuesta_correcta)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const { id_prueba, pregunta, respuesta, opciones } = preguntaData;

  const respuesta_correcta = parseInt(respuesta);

  poolc.query(
    query,
    [id_prueba, pregunta, opciones, respuesta_correcta],
    callback
  );
};

module.exports = Preguntas;
