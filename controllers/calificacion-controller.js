const { fn, col } = require('sequelize');

const Calificacion = require('../models/calificacion-model');

exports.getAll = async (req, res) => {
  try {
    const data = await Calificacion.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener Calificacion' });
  }
};

exports.getPromedioPorReceta = async (req, res) => {
  const { idReceta } = req.params;

  try {
    const resultado = await Calificacion.findOne({
      attributes: [[fn('AVG', col('calificacion')), 'promedio']],
      where: { idReceta },
    });

    const valor = resultado.dataValues.promedio;

    if (!valor) {
      return res.json({ idReceta, promedio: 'No hay votos registrados' });
    }

    const promedio = parseFloat(valor).toFixed(2);
    res.json({ idReceta, promedio });
  } catch (error) {
    console.error('Error al calcular promedio:', error);
    res.status(500).json({ error: 'Error al calcular promedio de calificación' });
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


exports.getByUsuarioYReceta = async (req, res) => {
  const { idUsuario, idReceta } = req.params;
  try {
    const item = await Calificacion.findOne({ where: { idUsuario, idReceta } });
    item ? res.json(item) : res.status(404).json({ mensaje: 'No calificación aún' });
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar calificación del usuario' });
  }
};

exports.create = async (req, res) => {
  try {
    const { comentarios, ...resto } = req.body;

    const nuevo = await Calificacion.create({
      ...resto,
      comentarios,
      estado: comentarios ? 'en espera' : null
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear Calificacion' });
  }
};


exports.updateEstado = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  if (!['en espera', 'aprobado', 'rechazado'].includes(estado)) {
    return res.status(400).json({ error: 'Estado inválido' });
  }

  try {
    const calificacion = await Calificacion.findByPk(id);
    if (!calificacion) return res.status(404).json({ error: 'No encontrado' });

    calificacion.estado = estado;
    await calificacion.save();

    res.json({ mensaje: 'Estado actualizado', calificacion });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
};

exports.getComentariosEnEspera = async (req, res) => {
  try {
    const data = await Calificacion.findAll({
      where: { estado: 'en espera' },
    
      order: [['idCalificacion', 'DESC']],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener comentarios en espera' });
  }
};


exports.getComentariosAprobadosPorReceta = async (req, res) => {
  const { idReceta } = req.params;

  try {
    const comentarios = await Calificacion.findAll({
      where: {
        idReceta,
        estado: 'aprobado',
        comentarios: { [require('sequelize').Op.ne]: '' }, // solo si tiene comentarios
      },
      order: [['idCalificacion', 'DESC']],
    });

    res.json(comentarios);
  } catch (error) {
    console.error('Error al obtener comentarios aprobados:', error);
    res.status(500).json({ error: 'Error al obtener comentarios aprobados' });
  }
};
