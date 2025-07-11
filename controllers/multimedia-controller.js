const fs = require('fs');
const path = require('path');
const Multimedia = require('../models/multimedia-model');

exports.getAll = async (req, res) => {
  try {
    const data = await Multimedia.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener multimedia' });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Multimedia.findByPk(req.params.id);
    item ? res.json(item) : res.status(404).json({ error: 'No encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener multimedia por ID' });
  }
};

exports.create = async (req, res) => {
  try {
    const nuevo = await Multimedia.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear multimedia' });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const { idPaso } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No se recibió ningún archivo' });
    }

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

exports.delete = async (req, res) => {
  try {
    const item = await Multimedia.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });

    const url = item.urlContenido;
    const nombreArchivo = url.split('/uploads/')[1];
    const rutaArchivo = path.join(__dirname, '..', 'uploads', nombreArchivo);

    fs.unlink(rutaArchivo, (err) => {
      if (err) {
        console.error('No se pudo borrar el archivo físico:', err);
      }
    });
    
    await item.destroy();
    res.json({ mensaje: 'Eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar multimedia:', err);
    res.status(500).json({ error: 'Error al eliminar multimedia' });
  }
};

exports.getByPasoId = async (req, res) => {
  try {
    const { idPaso } = req.params;
    const archivos = await Multimedia.findAll({ where: { idPaso } });

    res.json(archivos); 
  } catch (err) {
    console.error('Error al obtener multimedia por paso:', err);
    res.status(500).json({ error: 'Error al obtener multimedia por paso' });
  }
};
