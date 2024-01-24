const express = require('express');
const router = express.Router();
const preguntasController = require('../controllers/preguntasController.js'); 


router.post('/create', preguntasController.createPregunta);

module.exports = router;

