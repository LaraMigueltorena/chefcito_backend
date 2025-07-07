const express = require('express');
const router = express.Router();
const pasoCtrl = require('../controllers/paso-controller'); 

router.get('/', pasoCtrl.getAll);
router.get('/:id', pasoCtrl.getById);
router.get('/por-receta/:idReceta', pasoCtrl.getByRecetaId); 
router.post('/', pasoCtrl.create);
router.put('/:id', pasoCtrl.update);
router.delete('/:id', pasoCtrl.delete);

module.exports = router;
