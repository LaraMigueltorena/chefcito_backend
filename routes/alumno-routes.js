// routes/alumno-routes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/alumno-controller');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/dni';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage });

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create); // opcional, podés borrarla si solo usás la nueva
router.post('/upload', upload.fields([
  { name: 'dniFrente', maxCount: 1 },
  { name: 'dniDorso', maxCount: 1 },
]), ctrl.createWithImages);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.delete);

module.exports = router;
