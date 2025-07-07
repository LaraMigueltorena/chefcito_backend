const AsistenciaCurso = require('../models/asistenciaCurso-model');

exports.getAll = async (req, res) => {
  try {
    const data = await AsistenciaCurso.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener Asistencia del Curso' });
  }
};

exports.getById = async (req, res) => {
  const item = await AsistenciaCurso.findByPk(req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'No encontrado' });
};

exports.create = async (req, res) => {
  try {
    const nuevo = await AsistenciaCurso.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear Asistencia al Curso' });
  }
};

exports.update = async (req, res) => {
  const item = await AsistenciaCurso.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.update(req.body);
  res.json({ mensaje: 'Actualizado', item });
};

exports.delete = async (req, res) => {
  const item = await AsistenciaCurso.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.destroy();
  res.json({ mensaje: 'Eliminado' });
};

exports.getByAlumnoCronograma = async (req, res) => {
  const { alumno, cronograma } = req.query;
  try {
    const datos = await AsistenciaCurso.findAll({
      where: {
        idAlumno: alumno,
        idCronograma: cronograma
      }
    });
    res.json(datos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error filtrando asistencia' });
  }
};
