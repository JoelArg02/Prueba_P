const express = require("express");
const router = express.Router();
const PreguntasController = require("../controllers/preguntasController");

router.get("/", PreguntasController.getPreguntas);

router.post("/crear", PreguntasController.createPregunta)

router.get("/prueba-p/:id", PreguntasController.getPreguntaByIdPrueba);

module.exports = router;
