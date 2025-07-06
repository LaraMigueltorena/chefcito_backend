const express = require('express');
const router = express.Router();
const utilizadoCtrl = require('../controllers/utilizado-controller'); // ✅ ESTA LÍNEA FALTABA

router.get('/', utilizadoCtrl.getAll);
router.get('/por-ingrediente/:idIngrediente', utilizadoCtrl.getRecetasPorIngrediente);
router.get('/:id', utilizadoCtrl.getById);
router.get('/por-receta/:idReceta', utilizadoCtrl.getByRecetaId); // ✅ Esta es la nueva ruta
router.post('/', utilizadoCtrl.create);
router.put('/:id', utilizadoCtrl.update);
router.delete('/:id', utilizadoCtrl.delete);

module.exports = router;
