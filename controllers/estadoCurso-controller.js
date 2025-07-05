const { Op } = require('sequelize');
const Curso = require('../models/curso-model');
const CronogramaCurso = require('../models/cronogramaCurso-model');
const EstadoCurso = require('../models/estadoCurso-model');

exports.getAll = async (req, res) => {
  try {
    const data = await EstadoCurso.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener estadoCursos' });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await EstadoCurso.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar estadoCurso' });
  }
};

exports.create = async (req, res) => {
  try {
    const { idAlumno, idCronograma, estado } = req.body;

    const yaExiste = await EstadoCurso.findOne({
      where: { idAlumno, idCronograma }
    });
    if (yaExiste) {
      return res.status(400).json({ error: 'Ya existe estado para este alumno y cronograma' });
    }

    const nuevo = await EstadoCurso.create({ idAlumno, idCronograma, estado });
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear estadoCurso' });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await EstadoCurso.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });

    await item.update(req.body);
    res.json({ mensaje: 'estadoCurso actualizado', item });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar estadoCurso' });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await EstadoCurso.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });

    await item.destroy();
    res.json({ mensaje: 'estadoCurso eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar estadoCurso' });
  }
};

// Extra: todos los estadoCursos de un alumno
exports.getByAlumno = async (req, res) => {
  try {
    const data = await EstadoCurso.findAll({
      where: { idAlumno: req.params.idAlumno }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener estadoCursos del alumno' });
  }
};

// NUEVOS FILTROS:
exports.getDisponibles = async (req, res) => {
  try {
    const idAlumno = req.params.idAlumno;

    const ocupados = await EstadoCurso.findAll({
      where: {
        idAlumno,
        estado: { [Op.in]: ['en_curso', 'finalizado'] }
      }
    });

    const cronogramasOcupados = ocupados.map(e => e.idCronograma);

    const disponibles = await CronogramaCurso.findAll({
      where: {
        idCronograma: {
          [Op.notIn]: cronogramasOcupados.length ? cronogramasOcupados : [0]
        }
      },
      include: [{ model: Curso }]
    });

    res.json(disponibles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener cursos disponibles' });
  }
};

exports.getEnCurso = async (req, res) => {
  try {
    const idAlumno = req.params.idAlumno;

    const enCurso = await EstadoCurso.findAll({
      where: {
        idAlumno,
        estado: 'en_curso'
      },
      include: [{
        model: CronogramaCurso,
        include: [Curso]
      }]
    });

    res.json(enCurso);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener cursos en curso' });
  }
};

exports.getFinalizados = async (req, res) => {
  try {
    const idAlumno = req.params.idAlumno;

    const finalizados = await EstadoCurso.findAll({
      where: {
        idAlumno,
        estado: 'finalizado'
      },
      include: [{
        model: CronogramaCurso,
        include: [Curso]
      }]
    });

    res.json(finalizados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener cursos finalizados' });
  }
};
