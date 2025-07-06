const CronogramaCurso = require('../models/cronogramaCurso-model');
const Curso = require('../models/curso-model');
const Sede = require('../models/sede-model');

// ✅ Obtener TODOS los cronogramas con Curso y Sede asociados
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

// ✅ Obtener cronograma por ID con Curso y Sede
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

// ✅ Crear cronograma
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

// ✅ Actualizar cronograma
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

// ✅ Eliminar cronograma
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

// ✅ Cronogramas por ID de Curso con Curso y Sede
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

// ✅ Cronogramas por ID de Curso solo con Sede (opcional)
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
