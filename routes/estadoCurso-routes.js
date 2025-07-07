const express = require('express');
const router = express.Router();
const estadoCursoController = require('../controllers/estadoCurso-controller');

// Extras y filtros
router.get('/alumno/:idAlumno', estadoCursoController.getByAlumno);
router.get('/disponibles/:idAlumno', estadoCursoController.getDisponibles);
router.get('/en-curso/:idAlumno', estadoCursoController.getEnCurso);
router.get('/finalizados/:idAlumno', estadoCursoController.getFinalizados);

// NUEVO: Buscar idEstadoCurso con alumno + cronograma
router.get('/by-alumno-cronograma', estadoCursoController.getByAlumnoCronograma);

// ✅ Inscribir alumno con update de vacante
router.put('/inscribir/:idAlumno/:idCronograma', estadoCursoController.inscribirAlumno);

// CRUD base
router.get('/', estadoCursoController.getAll);
router.get('/:id', estadoCursoController.getById);
router.post('/', estadoCursoController.create);
router.put('/:id', estadoCursoController.update);
router.delete('/:id', estadoCursoController.delete);

module.exports = router;
