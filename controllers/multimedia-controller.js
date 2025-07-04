const path = require('path');
const Multimedia = require('../models/multimedia-model');

// Obtener todos los archivos multimedia
exports.getAll = async (req, res) => {
  try {
    const data = await Multimedia.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener multimedia' });
  }
};

// Obtener por ID
exports.getById = async (req, res) => {
  try {
    const item = await Multimedia.findByPk(req.params.id);
    item ? res.json(item) : res.status(404).json({ error: 'No encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener multimedia por ID' });
  }
};

// Crear multimedia desde JSON (opcional si usás solo subida de archivos)
exports.create = async (req, res) => {
  try {
    const nuevo = await Multimedia.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear multimedia' });
  }
};

// Subida de archivo con multer
exports.uploadFile = async (req, res) => {
  try {
    const { idPaso } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No se recibió ningún archivo' });
    }

    // Determinar tipo de contenido
    const tipo_contenido = file.mimetype.startsWith('image')
      ? 'imagen'
      : file.mimetype.startsWith('video')
      ? 'video'
      : 'otro';

    const nuevo = await Multimedia.create({
      idPaso,
      tipo_contenido,
      extension: path.extname(file.originalname).replace('.', ''),
      urlContenido: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,

    });

    res.status(201).json(nuevo);
  } catch (err) {
    console.error('Error en uploadFile:', err);
    res.status(500).json({ error: 'Error al subir archivo' });
  }
};

// Actualizar un registro multimedia
exports.update = async (req, res) => {
  try {
    const item = await Multimedia.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });

    await item.update(req.body);
    res.json({ mensaje: 'Actualizado', item });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar multimedia' });
  }
};

// Eliminar multimedia
exports.delete = async (req, res) => {
  try {
    const item = await Multimedia.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });

    await item.destroy();
    res.json({ mensaje: 'Eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar multimedia' });
  }
};
// Obtener archivo multimedia por ID de paso
exports.getByPasoId = async (req, res) => {
  try {
    const { idPaso } = req.params;
    const archivo = await Multimedia.findOne({ where: { idPaso } });

    if (!archivo) {
      return res.status(404).json({ error: 'No se encontró multimedia para este paso' });
    }

    res.json(archivo);
  } catch (err) {
    console.error('Error al obtener multimedia por paso:', err);
    res.status(500).json({ error: 'Error al obtener multimedia por paso' });
  }
};
