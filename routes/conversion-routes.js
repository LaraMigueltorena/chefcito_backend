const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/conversion-controller');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.get('/usuario/:idUsuario', ctrl.getByUsuario);
router.post('/', ctrl.create);
router.delete('/:id', ctrl.delete);

module.exports = router;
