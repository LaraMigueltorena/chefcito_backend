const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/multimedia-controller');
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.originalname.split('.')[0];
    cb(null, `${Date.now()}-${name}${ext}`);
  },
});

const upload = multer({ storage });

// Rutas
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.get('/paso/:idPaso', ctrl.getByPasoId); // ✅ corregido acá
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.delete);

// Ruta para subir archivos multimedia
router.post('/upload', upload.single('archivo'), ctrl.uploadFile);

module.exports = router;
