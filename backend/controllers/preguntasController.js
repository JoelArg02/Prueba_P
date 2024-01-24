const Preguntas = require("../models/Preguntas");

const PreguntasController = {};

exports.getPreguntas = (req, res) => {
  Preguntas.getPreguntas((err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al obtener las preguntas." });
    }
    return res.status(200).json(result.rows);
  });
};

exports.createPregunta = (req, res) => {
  const preguntaData = req.body;
  Preguntas.createPregunta(preguntaData, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al crear la pregunta." });
    }
    return res.status(201).json(result.rows[0]);
  });
};


exports.getPreguntaByIdPrueba = (req, res) => {
  const id = req.params.id;
  Preguntas.getPreguntaByIdPrueba(id, (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error al obtener las preguntas de la prueba." });
    }
    return res.status(200).json(result.rows);
  });
};
