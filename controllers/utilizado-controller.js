const Utilizado = require('../models/utilizado-model');

exports.getAll = async (req, res) => {
  try {
    const data = await Utilizado.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ingredientes utilizados' });
  }
};

exports.getById = async (req, res) => {
  const item = await Utilizado.findByPk(req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'No encontrado' });
};

exports.create = async (req, res) => {
  try {
    const nuevo = await Utilizado.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear ingrediente utilizado' });
  }
};

exports.update = async (req, res) => {
  const item = await Utilizado.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.update(req.body);
  res.json({ mensaje: 'Actualizado', item });
};

exports.delete = async (req, res) => {
  const item = await Utilizado.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.destroy();
  res.json({ mensaje: 'Eliminado' });
};
