const poolc = require("../config/db.js"); // Asegúrate de que la ruta sea correcta

const Referencia = {};

Referencia.crearPregunta = (pregunta, respuesta, callback) => {
  if (typeof callback !== "function") {
    throw new Error("Callback debe ser una función");
  }
  poolc.query(
    "INSERT INTO preguntas (pregunta, respuesta) VALUES ($1, $2) RETURNING id_pregunta",
    [pregunta, respuesta],
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results.rows[0].id_pregunta);
      }
    }
  );
};

module.exports = Referencia;
