const Receta = require('../models/receta-model');

exports.getAllRecetas = async (req, res) => {
  try {
    const recetas = await Receta.findAll();
    res.json(recetas);
  } catch (err) {
    console.error('Error al obtener recetas:', err.message);
    res.status(500).json({ error: 'Error al obtener recetas' });
  }
};
exports.createReceta = async (req, res) => {
  try {
    const nuevaReceta = await Receta.create(req.body);
    res.status(201).json(nuevaReceta);
  } catch (err) {
    console.error('Error al crear receta:', err.message);
    res.status(500).json({ error: 'Error al crear la receta' });
  }
};
exports.updateReceta = async (req, res) => {
  const id = req.params.id;
  try {
    const receta = await Receta.findByPk(id);
    if (!receta) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    await receta.update(req.body);
    res.json({ mensaje: 'Receta actualizada correctamente', receta });
  } catch (err) {
    console.error('Error al actualizar receta:', err.message);
    res.status(500).json({ error: 'Error al actualizar la receta' });
  }
};
exports.deleteReceta = async (req, res) => {
  const id = req.params.id;
  try {
    const receta = await Receta.findByPk(id);
    if (!receta) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    await receta.destroy();
    res.json({ mensaje: 'Receta eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar receta:', err.message);
    res.status(500).json({ error: 'Error al eliminar la receta' });
  }
};

exports.createReceta = async (req, res) => {
  try {
    const nuevaReceta = await Receta.create({
      ...req.body,
      estado: 'en espera' // <-- importante para garantizar que siempre se aplique
    });
    res.status(201).json(nuevaReceta);
  } catch (err) {
    console.error('Error al crear receta:', err.message);
    res.status(500).json({ error: 'Error al crear la receta' });
  }
};


