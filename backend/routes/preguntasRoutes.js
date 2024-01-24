const express = require("express");
const router = express.Router();
const PreguntasController = require("../controllers/PreguntasController");

router.get("/", PreguntasController.getPreguntas);

router.post("/crear", PreguntasController.createPregunta);

