const { Op } = require('sequelize');
const sequelize = require('../config/db-config');
const Curso = require('../models/curso-model');
const CronogramaCurso = require('../models/cronogramaCurso-model');
const EstadoCurso = require('../models/estadoCurso-model');
const Sede = require('../models/sede-model'); // ✅

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
    const estado = await EstadoCurso.findByPk(req.params.id);
    if (!estado) return res.status(404).json({ error: 'EstadoCurso no encontrado' });

    const cronograma = await CronogramaCurso.findByPk(estado.idCronograma);
    if (cronograma) {
      cronograma.vacantesDisponibles += 1;
      await cronograma.save();
    }

    await estado.destroy();
    res.json({ mensaje: 'Desinscripción correcta, vacante devuelta' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar EstadoCurso' });
  }
};

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
        include: [Curso, Sede]
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
        include: [Curso, Sede]
      }]
    });

    res.json(finalizados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener cursos finalizados' });
  }
};

exports.inscribirAlumno = async (req, res) => {
  const { idAlumno: idUsuario, idCronograma } = req.params;

  try {
    await sequelize.transaction(async (t) => {
      const cronograma = await CronogramaCurso.findByPk(idCronograma, { transaction: t });
      if (!cronograma) throw new Error('Cronograma no encontrado');

      if (cronograma.vacantesDisponibles <= 0) {
        throw new Error('No hay vacantes disponibles');
      }

      // 👉 Verifica si ya existe inscripción para este usuario
      const yaExiste = await EstadoCurso.findOne({
        where: { idAlumno: idUsuario, idCronograma },
        transaction: t,
      });
      if (yaExiste) throw new Error('Ya existe inscripción para este usuario y cronograma');

      // Resta vacante
      cronograma.vacantesDisponibles -= 1;
      await cronograma.save({ transaction: t });

      // ✅ Crea EstadoCurso con idAlumno = idUsuario
      await EstadoCurso.create(
        { idAlumno: idUsuario, idCronograma, estado: 'en_curso' },
        { transaction: t }
      );
    });

    res.json({ mensaje: 'Inscripción correcta, vacantes actualizadas.' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || 'Error al inscribir usuario' });
  }
};


// 🔥 NUEVO: Buscar idEstadoCurso por alumno + cronograma
exports.getByAlumnoCronograma = async (req, res) => {
  const { alumno, cronograma } = req.query;

  try {
    const estado = await EstadoCurso.findOne({
      where: {
        idAlumno: alumno,
        idCronograma: cronograma
      }
    });

    if (!estado) return res.status(404).json({ error: 'No encontrado' });

    res.json({ idEstadoCurso: estado.idEstadoCurso });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al buscar EstadoCurso' });
  }
};
