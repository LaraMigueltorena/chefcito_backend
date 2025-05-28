const express = require('express');
const router = express.Router();
const recetaController = require('../controllers/receta-controller');

router.get('/', recetaController.getAllRecetas);
router.post('/', recetaController.createReceta);
router.put('/:id', recetaController.updateReceta);
router.delete('/:id', recetaController.deleteReceta);


module.exports = router;
