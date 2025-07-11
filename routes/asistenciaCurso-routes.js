const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/asistenciaCurso-controller');

router.get('/', ctrl.getAll);
router.get('/by-alumno-cronograma', ctrl.getByAlumnoCronograma);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.delete);



module.exports = router;
