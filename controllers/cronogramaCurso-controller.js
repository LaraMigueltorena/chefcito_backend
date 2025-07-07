const CronogramaCurso = require('../models/cronogramaCurso-model');
const Curso = require('../models/curso-model');
const Sede = require('../models/sede-model');

exports.getAll = async (req, res) => {
  try {
    const data = await CronogramaCurso.findAll({
      include: [
        { model: Curso },
        { model: Sede }
      ]
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener cronogramas del curso' });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await CronogramaCurso.findByPk(req.params.id, {
      include: [
        { model: Curso },
        { model: Sede }
      ]
    });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'No encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener cronograma por ID' });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      idSede,
      idCurso,
      fechaInicio,
      fechaFin,
      vacantesDisponibles,
      promocion
    } = req.body;

    const nuevo = await CronogramaCurso.create({
      idSede,
      idCurso,
      fechaInicio,
      fechaFin,
      vacantesDisponibles,
      promocion
    });

    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear cronograma del curso' });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await CronogramaCurso.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });

    const {
      idSede,
      idCurso,
      fechaInicio,
      fechaFin,
      vacantesDisponibles,
      promocion
    } = req.body;

    await item.update({
      idSede,
      idCurso,
      fechaInicio,
      fechaFin,
      vacantesDisponibles,
      promocion
    });

    res.json({ mensaje: 'Actualizado', item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar cronograma del curso' });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await CronogramaCurso.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });

    await item.destroy();
    res.json({ mensaje: 'Eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar cronograma del curso' });
  }
};

exports.getByCurso = async (req, res) => {
  try {
    const data = await CronogramaCurso.findAll({
      where: { idCurso: req.params.idCurso },
      include: [
        { model: Curso },
        { model: Sede }
      ]
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener cronogramas por curso' });
  }
};

exports.getSedesByCurso = async (req, res) => {
  try {
    const data = await CronogramaCurso.findAll({
      where: { idCurso: req.params.idCurso },
      include: [ { model: Sede } ]
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener cronogramas con sedes' });
  }
};
