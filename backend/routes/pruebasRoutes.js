const express = require('express');
const router = express.Router();
const PruebaController = require('../controllers/PruebaController');

router.get('/', PruebaController.getPruebas);

router.post('/crear', PruebaController.createPrueba);


module.exports = router;
