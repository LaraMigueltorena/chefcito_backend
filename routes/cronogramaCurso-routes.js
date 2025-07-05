const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cronogramaCurso-controller');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.delete);

// ✅ Nuevo: obtener cronogramas por curso
router.get('/curso/:idCurso', ctrl.getByCurso);

// Si quieres la versión que incluye sedes, mantenla:
router.get('/curso/:idCurso/sedes', ctrl.getSedesByCurso);

module.exports = router;
