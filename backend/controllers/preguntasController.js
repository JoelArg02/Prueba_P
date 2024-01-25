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
    return res.status(200).json({ message: "Pregunta creada exitosamente." });
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

exports.editPregunta = (req, res) => {
  const id = req.params.id;
  Preguntas.editPregunta(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al editar la pregunta." });
    }
    return res.status(200).json({ message: "Pregunta editada exitosamente." });
  });
};

exports.deletePregunta = (req, res) => {
  const id = req.params.id;
  Preguntas.deletePregunta(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al eliminar la pregunta." });
    }
    return res
      .status(200)
      .json({ message: "Pregunta eliminada exitosamente." });
  });
};  

exports.deletePruebaBolean = (req, res) => {
  const id = req.params.id;
  Preguntas.deletePruebaBolean(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al eliminar la pregunta." });
    }
    return res
      .status(200)
      .json({ message: "Pregunta eliminada exitosamente." });
  });
};
