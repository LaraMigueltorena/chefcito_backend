
exports.getAll = async (req, res) => {
  try {
    const data = await Foto.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener Foto' });
  }
};

exports.getById = async (req, res) => {
  const item = await Foto.findByPk(req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'No encontrado' });
};

const path = require('path');
const Foto = require('../models/foto-model');

exports.uploadFoto = async (req, res) => {
  try {
    const { idReceta } = req.body;
    if (!req.file || !idReceta) {
      return res.status(400).json({ error: 'Falta archivo o idReceta' });
    }

    const nuevaFoto = await Foto.create({
      idReceta,
      urlFoto: `/uploads/${req.file.filename}`,
      extension: path.extname(req.file.originalname).substring(1),
    });

    res.status(201).json(nuevaFoto);
  } catch (error) {
    console.error('Error al subir foto:', error.message);
    res.status(500).json({ error: 'Error al subir foto' });
  }
};


exports.create = async (req, res) => {
  try {
    const nuevo = await Foto.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear Foto' });
  }
};

exports.update = async (req, res) => {
  const item = await Foto.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.update(req.body);
  res.json({ mensaje: 'Actualizado', item });
};

exports.delete = async (req, res) => {
  const item = await Foto.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.destroy();
  res.json({ mensaje: 'Eliminado' });
};
