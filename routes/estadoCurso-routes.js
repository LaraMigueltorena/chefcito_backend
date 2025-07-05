const express = require('express');
const router = express.Router();
const estadoCursoController = require('../controllers/estadoCurso-controller');

router.get('/', estadoCursoController.getAll);
router.get('/:id', estadoCursoController.getById);
router.post('/', estadoCursoController.create);
router.put('/:id', estadoCursoController.update);
router.delete('/:id', estadoCursoController.delete);

// Extra: todos los estadoCursos de un alumno
router.get('/alumno/:idAlumno', estadoCursoController.getByAlumno);

// NUEVAS rutas para filtrados:
router.get('/disponibles/:idAlumno', estadoCursoController.getDisponibles);
router.get('/en-curso/:idAlumno', estadoCursoController.getEnCurso);
router.get('/finalizados/:idAlumno', estadoCursoController.getFinalizados);

module.exports = router;
