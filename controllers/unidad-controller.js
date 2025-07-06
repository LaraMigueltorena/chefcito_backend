const Unidad = require('../models/unidad-model');
const { Sequelize } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const data = await Unidad.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener Unidad' });
  }
};

exports.getById = async (req, res) => {
  const item = await Unidad.findByPk(req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'No encontrado' });
};

// Crear unidad sin duplicar
exports.create = async (req, res) => {
  try {
    const descripcionOriginal = req.body.descripcion;

    if (!descripcionOriginal || typeof descripcionOriginal !== 'string') {
      return res.status(400).json({ error: 'Falta la descripción de la unidad' });
    }

    const descripcionLimpia = descripcionOriginal.trim().toLowerCase();

    // Buscar si ya existe una unidad con esa descripción (ignorando mayúsculas y espacios)
    const unidadExistente = await Unidad.findOne({
      where: Sequelize.where(
        Sequelize.fn('trim', Sequelize.fn('lower', Sequelize.col('descripcion'))),
        descripcionLimpia
      )
    });

    if (unidadExistente) {
      return res.json(unidadExistente); // ✅ Devuelve la unidad existente
    }

    // Crear nueva unidad si no existe
    const nueva = await Unidad.create({ descripcion: descripcionLimpia });
    res.status(201).json(nueva);
  } catch (err) {
    console.error('Error al crear unidad:', err);
    res.status(500).json({ error: 'Error al crear Unidad' });
  }
};

exports.update = async (req, res) => {
  const item = await Unidad.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.update(req.body);
  res.json({ mensaje: 'Actualizado', item });
};

exports.delete = async (req, res) => {
  const item = await Unidad.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.destroy();
  res.json({ mensaje: 'Eliminado' });
};

// 🔍 Buscar unidad por descripción exacta (ignora mayúsculas y espacios)
exports.searchByDescripcion = async (req, res) => {
  try {
    const { descripcion } = req.query;

    if (!descripcion || typeof descripcion !== 'string') {
      return res.status(400).json({ error: 'Falta el parámetro "descripcion"' });
    }

    const descripcionLimpia = descripcion.trim().toLowerCase();

    const unidad = await Unidad.findOne({
      where: Sequelize.where(
        Sequelize.fn('trim', Sequelize.fn('lower', Sequelize.col('descripcion'))),
        descripcionLimpia
      )
    });

    if (!unidad) {
      return res.status(404).json({ mensaje: 'No se encontró ninguna unidad con esa descripción' });
    }

    res.json(unidad);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al buscar unidad' });
  }
};
