const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/calificacion-controller');

router.get('/promedio/:idReceta', ctrl.getPromedioPorReceta);
router.get('/usuario/:idUsuario/receta/:idReceta', ctrl.getByUsuarioYReceta);
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.delete);

module.exports = router;
