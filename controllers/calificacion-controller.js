const Calificacion = require('../models/calificacion-model');

exports.getAll = async (req, res) => {
  try {
    const data = await Calificacion.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener Calificacion' });
  }
};

exports.getById = async (req, res) => {
  const item = await Calificacion.findByPk(req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'No encontrado' });
};

exports.create = async (req, res) => {
  try {
    const nuevo = await Calificacion.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear Calificacion' });
  }
};

exports.update = async (req, res) => {
  const item = await Calificacion.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.update(req.body);
  res.json({ mensaje: 'Actualizado', item });
};

exports.delete = async (req, res) => {
  const item = await Calificacion.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.destroy();
  res.json({ mensaje: 'Eliminado' });
};
