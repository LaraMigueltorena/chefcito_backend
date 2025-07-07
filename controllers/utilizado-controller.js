const Utilizado = require('../models/utilizado-model');
const Unidad = require('../models/unidad-model');

exports.getAll = async (req, res) => {
  try {
    const data = await Utilizado.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener registros' });
  }
};

exports.getById = async (req, res) => {
  const item = await Utilizado.findByPk(req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'No encontrado' });
};

exports.create = async (req, res) => {
  try {
    const {
      idReceta,
      idIngrediente,
      cantidad,
      idUnidad,
      observaciones,
    } = req.body;

    const unidad = await Unidad.findByPk(idUnidad);
    if (!unidad) {
      return res.status(400).json({ error: 'Unidad no encontrada' });
    }

    const nuevo = await Utilizado.create({
      idReceta,
      idIngrediente,
      cantidad,
      idUnidad,
      unidad: unidad.descripcion, 
      observaciones,
    });

    res.status(201).json(nuevo);
  } catch (err) {
    console.error('Error al crear utilizado:', err);
    res.status(500).json({ error: 'Error al guardar ingrediente en receta' });
  }
};

exports.update = async (req, res) => {
  const item = await Utilizado.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.update(req.body);
  res.json({ mensaje: 'Actualizado', item });
};

exports.delete = async (req, res) => {
  const item = await Utilizado.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.destroy();
  res.json({ mensaje: 'Eliminado' });
};

exports.getByRecetaId = async (req, res) => {
  try {
    const { idReceta } = req.params;
    const data = await Utilizado.findAll({
      where: { idReceta },
      include: ['Ingrediente'], 
    });
    res.json(data);
  } catch (err) {
    console.error('Error al obtener ingredientes:', err);
    res.status(500).json({ error: 'Error al obtener ingredientes de la receta' });
  }
};

exports.getRecetasPorIngrediente = async (req, res) => {
  try {
    const { idIngrediente } = req.params;

    if (!idIngrediente) {
      return res.status(400).json({ error: 'Falta el idIngrediente en los parámetros' });
    }

    const utilizados = await Utilizado.findAll({
      where: { idIngrediente },
      attributes: ['idReceta'], 
      group: ['idReceta'], 
    });

    const recetaIds = utilizados.map(u => u.idReceta);

    res.json(recetaIds);
  } catch (err) {
    console.error('Error al obtener recetas por ingrediente:', err);
    res.status(500).json({ error: 'Error al buscar recetas por ingrediente' });
  }
};
