const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/unidad-controller');

router.get('/', ctrl.getAll);
router.get('/buscar', ctrl.searchByDescripcion); 
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.delete);

module.exports = router;
