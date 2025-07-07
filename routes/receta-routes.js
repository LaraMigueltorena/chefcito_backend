const express = require('express');
const router = express.Router();
const recetaController = require('../controllers/receta-controller');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.originalname.split('.')[0];
    cb(null, `${Date.now()}-${name}${ext}`);
  },
});
const upload = multer({ storage });
router.get('/existe', recetaController.verificarRecetaPorNombreYUsuario);
router.get('/usuario/:idUsuario', recetaController.getRecetasPorUsuario);
router.get('/en-espera', recetaController.getRecetasEnEspera);
router.get('/ultimas', recetaController.getUltimasRecetas);
router.get('/:id', recetaController.getRecetaPorId);
router.get('/', recetaController.getAllRecetas);
router.post('/', recetaController.createReceta); 
router.post('/upload', upload.single('fotoPrincipal'), recetaController.uploadWithImage); 
router.put('/:id', recetaController.updateReceta); 
router.put('/upload/:id', upload.single('fotoPrincipal'), recetaController.updateWithImage);
router.delete('/:id', recetaController.deleteReceta);
router.get('/por-tipo/:idTipo', recetaController.getRecetasPorTipo);



module.exports = router;
