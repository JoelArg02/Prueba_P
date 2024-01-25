const express = require('express');
const router = express.Router();
const PruebaController = require('../controllers/PruebaController');

router.get('/', PruebaController.getPruebas);

router.post('/crear', PruebaController.createPrueba);

router.put('/editar/:id', PruebaController.editPrueba);

router.put('/estado/:id', PruebaController.deletePruebaBoolean)

router.delete('/eliminar/:id', PruebaController.deletePrueba);

module.exports = router;
