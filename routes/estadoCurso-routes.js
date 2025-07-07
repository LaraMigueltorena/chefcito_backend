const express = require('express');
const router = express.Router();
const estadoCursoController = require('../controllers/estadoCurso-controller');

router.get('/alumno/:idAlumno', estadoCursoController.getByAlumno);
router.get('/disponibles/:idAlumno', estadoCursoController.getDisponibles);
router.get('/en-curso/:idAlumno', estadoCursoController.getEnCurso);
router.get('/finalizados/:idAlumno', estadoCursoController.getFinalizados);
router.get('/by-alumno-cronograma', estadoCursoController.getByAlumnoCronograma);
router.put('/inscribir/:idAlumno/:idCronograma', estadoCursoController.inscribirAlumno);
router.get('/', estadoCursoController.getAll);
router.get('/:id', estadoCursoController.getById);
router.post('/', estadoCursoController.create);
router.put('/:id', estadoCursoController.update);
router.delete('/:id', estadoCursoController.delete);

module.exports = router;
