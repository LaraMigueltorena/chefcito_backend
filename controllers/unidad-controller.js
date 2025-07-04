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

exports.create = async (req, res) => {
  try {
    const nuevo = await Unidad.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
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
