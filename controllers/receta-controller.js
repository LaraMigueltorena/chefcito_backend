const { Op } = require('sequelize');
const Receta = require('../models/receta-model');

// Obtener todas las recetas, con filtros opcionales por nombre y ordenconst Usuario = require('../models/usuario-model'); // asegurate de tener esto importado

exports.getAllRecetas = async (req, res) => {
  try {
    const { nombre, orden } = req.query;

    const whereClause = nombre
      ? {
          nombreReceta: {
            [Op.like]: `%${nombre}%`
          }
        }
      : {};

    const recetas = await Receta.findAll({
      where: whereClause,
      order: [['idReceta', orden === 'asc' ? 'ASC' : 'DESC']],
      //include: {
        //model: Usuario,
        //attributes: ['nickname']
      //}
    });
    
    res.json(recetas);
  } catch (err) {
    console.error('Error al buscar recetas:', err.message);
    res.status(500).json({ error: 'Error al buscar recetas' });
  }
};


// Obtener las 3 últimas recetas
exports.getUltimasRecetas = async (req, res) => {
  try {
    const recetas = await Receta.findAll({
      order: [['idReceta', 'DESC']],
      limit: 3,
      //include: {
        //model: Usuario,
        //attributes: ['nickname']
      //}
    });
    res.json(recetas);
  } catch (err) {
  console.error('Error al buscar recetas:', err);
  res.status(500).json({ error: 'Error al buscar recetas' });
}

};

// Obtener una receta por ID
exports.getRecetaPorId = async (req, res) => {
  try {
    const receta = await Receta.findByPk(req.params.id);
    if (!receta) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    res.json(receta);
  } catch (err) {
    console.error('Error al obtener receta:', err.message);
    res.status(500).json({ error: 'Error al obtener receta' });
  }
};

// Crear una nueva receta
exports.createReceta = async (req, res) => {
  try {
    const nuevaReceta = await Receta.create(req.body);
    res.status(201).json(nuevaReceta);
  } catch (err) {
    console.error('Error al crear receta:', err.message);
    res.status(500).json({ error: 'Error al crear la receta' });
  }
};

// Actualizar una receta existente
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

// Eliminar una receta
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



