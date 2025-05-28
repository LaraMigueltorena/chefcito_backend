const CronogramaCurso = require('../models/cronogramaCurso-model');

exports.getAll = async (req, res) => {
  try {
    const data = await CronogramaCurso.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener Cronograma del Curso' });
  }
};

exports.getById = async (req, res) => {
  const item = await CronogramaCurso.findByPk(req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'No encontrado' });
};

exports.create = async (req, res) => {
  try {
    const nuevo = await CronogramaCurso.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear Cronograma del Curso' });
  }
};

exports.update = async (req, res) => {
  const item = await CronogramaCurso.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.update(req.body);
  res.json({ mensaje: 'Actualizado', item });
};

exports.delete = async (req, res) => {
  const item = await CronogramaCurso.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.destroy();
  res.json({ mensaje: 'Eliminado' });
};
