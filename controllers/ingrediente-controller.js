const Ingrediente = require('../models/ingrediente-model');
const { Sequelize } = require('sequelize');

// Obtener todos los ingredientes
exports.getAll = async (req, res) => {
  try {
    const data = await Ingrediente.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ingredientes' });
  }
};

// Obtener por ID
exports.getById = async (req, res) => {
  const item = await Ingrediente.findByPk(req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'No encontrado' });
};

// Crear ingrediente (evita duplicados y normaliza el nombre)
exports.create = async (req, res) => {
  try {
    const nombreOriginal = req.body.nombre;

    if (!nombreOriginal || typeof nombreOriginal !== 'string') {
      return res.status(400).json({ error: 'Falta el nombre del ingrediente' });
    }

    const nombreLimpio = nombreOriginal.trim().toLowerCase();
    const plural = nombreLimpio.endsWith('s') ? nombreLimpio : nombreLimpio + 's';
    const singular = nombreLimpio.endsWith('s') ? nombreLimpio.slice(0, -1) : nombreLimpio;

    // Buscar coincidencias con singular o plural
    const existentes = await Ingrediente.findAll();

    const coincidencia = existentes.find(i => {
      const nombreBD = i.nombre?.trim().toLowerCase();
      return (
        nombreBD === nombreLimpio ||
        nombreBD === plural ||
        nombreBD === singular
      );
    });

    if (coincidencia) {
      return res.json(coincidencia); // ✅ Si ya existe, se devuelve
    }

    const nuevo = await Ingrediente.create({ nombre: nombreLimpio });
    res.status(201).json(nuevo);
  } catch (err) {
    console.error('Error al crear ingrediente:', err);
    res.status(500).json({ error: 'Error al crear ingrediente' });
  }
};

// Actualizar ingrediente
exports.update = async (req, res) => {
  const item = await Ingrediente.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.update(req.body);
  res.json({ mensaje: 'Actualizado', item });
};

// Eliminar ingrediente
exports.delete = async (req, res) => {
  const item = await Ingrediente.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.destroy();
  res.json({ mensaje: 'Eliminado' });
};

exports.searchByExactName = async (req, res) => {
  try {
    const { nombre } = req.query;

    if (!nombre || typeof nombre !== 'string') {
      return res.status(400).json({ error: 'Falta el parámetro "nombre"' });
    }

    const nombreLimpio = nombre.trim().toLowerCase();
    const plural = nombreLimpio.endsWith('s') ? nombreLimpio : nombreLimpio + 's';
    const singular = nombreLimpio.endsWith('s') ? nombreLimpio.slice(0, -1) : nombreLimpio;

    // Traer todos los ingredientes (se puede optimizar más adelante)
    const ingredientes = await Ingrediente.findAll();

    const coincidencia = ingredientes.find(i => {
      const nombreBD = i.nombre?.trim().toLowerCase();
      return (
        nombreBD === nombreLimpio ||
        nombreBD === plural ||
        nombreBD === singular
      );
    });

    if (!coincidencia) {
      return res.status(404).json({ mensaje: 'No se encontró ningún ingrediente con ese nombre (ni singular ni plural)' });
    }

    res.json(coincidencia);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al buscar ingrediente por nombre' });
  }
};

