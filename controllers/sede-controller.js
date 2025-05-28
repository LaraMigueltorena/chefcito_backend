const Sede = require('../models/sede-model');

exports.getAll = async (req, res) => {
  try {
    const data = await Sede.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener Sedes' });
  }
};

exports.getById = async (req, res) => {
  const item = await Sede.findByPk(req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'No encontrado' });
};

exports.create = async (req, res) => {
  try {
    const nuevo = await Sede.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear Sede' });
  }
};

exports.update = async (req, res) => {
  const item = await Sede.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.update(req.body);
  res.json({ mensaje: 'Actualizado', item });
};

exports.delete = async (req, res) => {
  const item = await Sede.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.destroy();
  res.json({ mensaje: 'Eliminado' });
};
