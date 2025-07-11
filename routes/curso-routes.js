const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/curso-controller');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const cursosDir = 'uploads/cursos/';
if (!fs.existsSync(cursosDir)) {
  fs.mkdirSync(cursosDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, cursosDir); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});
const upload = multer({ storage });

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.delete);
router.post('/:id/upload-imagen', upload.single('imagen'), ctrl.uploadImagen);

module.exports = router;
