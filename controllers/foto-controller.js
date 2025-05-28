const Foto = require('../models/foto-model');

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
