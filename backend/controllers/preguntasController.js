const Preguntas = require("../models/Preguntas");

exports.createPregunta = (req, res) => {
  const { pregunta, respuesta } = req.body;
  Preguntas.crearPregunta(pregunta, respuesta, (err, id_pregunta) => {
    if (err) {
      console.error("Error al crear la pregunta:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    res.json({ id_pregunta });
  });
};