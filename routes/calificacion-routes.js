const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/calificacion-controller');
router.get('/pendientes', ctrl.getComentariosEnEspera);
router.get('/promedio/:idReceta', ctrl.getPromedioPorReceta);
router.get('/usuario/:idUsuario/receta/:idReceta', ctrl.getByUsuarioYReceta);
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.delete);
router.put('/:id/estado', ctrl.updateEstado);
router.get('/comentarios-aprobados/:idReceta', ctrl.getComentariosAprobadosPorReceta);




module.exports = router;
