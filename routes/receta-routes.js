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

router.get('/usuario/:idUsuario', recetaController.getRecetasPorUsuario);
router.get('/en-espera', recetaController.getRecetasEnEspera);
router.get('/ultimas', recetaController.getUltimasRecetas);
router.get('/:id', recetaController.getRecetaPorId);
router.get('/', recetaController.getAllRecetas);

router.post('/', recetaController.createReceta); // ruta vieja sin imagen
router.post('/upload', upload.single('fotoPrincipal'), recetaController.uploadWithImage); // crear con imagen
router.put('/:id', recetaController.updateReceta); // actualizar sin imagen

// ✅ NUEVA ruta para actualizar con imagen
router.put('/upload/:id', upload.single('fotoPrincipal'), recetaController.updateWithImage);

router.delete('/:id', recetaController.deleteReceta);
router.get('/por-tipo/:idTipo', recetaController.getRecetasPorTipo);

module.exports = router;
