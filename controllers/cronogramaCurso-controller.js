const CronogramaCurso = require('../models/cronogramaCurso-model');

exports.getAll = async (req, res) => {
  try {
    const data = await CronogramaCurso.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cronogramas del curso' });
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
    res.status(500).json({ error: 'Error al crear cronograma del curso' });
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

// ✅ Nuevo: cronogramas de un curso específico
exports.getByCurso = async (req, res) => {
  try {
    const data = await CronogramaCurso.findAll({
      where: { idCurso: req.params.idCurso }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cronogramas por curso' });
  }
};

// (Opcional) versión con sedes incluidas si lo deseas:
exports.getSedesByCurso = async (req, res) => {
  try {
    const data = await CronogramaCurso.findAll({
      where: { idCurso: req.params.idCurso },
      include: ['Sede']  // Asegúrate de tener la asociación configurada en tus modelos
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cronogramas con sedes' });
  }
};
