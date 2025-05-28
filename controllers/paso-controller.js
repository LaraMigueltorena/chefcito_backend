const Paso = require('../models/paso-model');

exports.getAll = async (req, res) => {
  try {
    const data = await Paso.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener Pasos' });
  }
};

exports.getById = async (req, res) => {
  const item = await Paso.findByPk(req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'No encontrado' });
};

exports.create = async (req, res) => {
  try {
    const nuevo = await Paso.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear Paso' });
  }
};

exports.update = async (req, res) => {
  const item = await Paso.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.update(req.body);
  res.json({ mensaje: 'Actualizado', item });
};

exports.delete = async (req, res) => {
  const item = await Paso.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.destroy();
  res.json({ mensaje: 'Eliminado' });
};
