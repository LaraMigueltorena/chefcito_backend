const Utilizado = require('../models/utilizado-model');
const Unidad = require('../models/unidad-model');

// Obtener todos los registros utilizados
exports.getAll = async (req, res) => {
  try {
    const data = await Utilizado.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener registros' });
  }
};

// Obtener por ID
exports.getById = async (req, res) => {
  const item = await Utilizado.findByPk(req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'No encontrado' });
};

// Crear un nuevo registro en utilizados
exports.create = async (req, res) => {
  try {
    const {
      idReceta,
      idIngrediente,
      cantidad,
      idUnidad,
      observaciones,
    } = req.body;

    // Buscar descripción de la unidad
    const unidad = await Unidad.findByPk(idUnidad);
    if (!unidad) {
      return res.status(400).json({ error: 'Unidad no encontrada' });
    }

    const nuevo = await Utilizado.create({
      idReceta,
      idIngrediente,
      cantidad,
      idUnidad,
      unidad: unidad.descripcion, // ✅ Guardamos el texto
      observaciones,
    });

    res.status(201).json(nuevo);
  } catch (err) {
    console.error('Error al crear utilizado:', err);
    res.status(500).json({ error: 'Error al guardar ingrediente en receta' });
  }
};

// Actualizar un registro
exports.update = async (req, res) => {
  const item = await Utilizado.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.update(req.body);
  res.json({ mensaje: 'Actualizado', item });
};

// Eliminar un registro
exports.delete = async (req, res) => {
  const item = await Utilizado.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.destroy();
  res.json({ mensaje: 'Eliminado' });
};

// Obtener ingredientes utilizados por idReceta
exports.getByRecetaId = async (req, res) => {
  try {
    const { idReceta } = req.params;
    const data = await Utilizado.findAll({
      where: { idReceta },
      include: ['Ingrediente'], // Asegurate que la relación esté definida en el modelo
    });
    res.json(data);
  } catch (err) {
    console.error('Error al obtener ingredientes:', err);
    res.status(500).json({ error: 'Error al obtener ingredientes de la receta' });
  }
};