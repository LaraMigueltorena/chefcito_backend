// 📁 controllers/receta-controller.js

const path = require('path');
const { Op } = require('sequelize');
const Receta = require('../models/receta-model');
const Usuario = require('../models/usuario-model');



// Obtener todas las recetas con filtros opcionales
exports.getAllRecetas = async (req, res) => {
  try {
    const { nombre, orden } = req.query;
    const whereClause = nombre ? { nombreReceta: { [Op.like]: `%${nombre}%` } } : {};

    const recetas = await Receta.findAll({
      where: whereClause,
      order: [['idReceta', orden === 'asc' ? 'ASC' : 'DESC']],
      include: {
        model: Usuario,
        attributes: ['nickname']
      }
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
      include: {
        model: Usuario,
        attributes: ['nickname']
      }
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
    const receta = await Receta.findByPk(req.params.id, {
      include: {
        model: Usuario,
        attributes: ['nickname']
      }
    });
    if (!receta) return res.status(404).json({ error: 'Receta no encontrada' });
    res.json(receta);
  } catch (err) {
    console.error('Error al obtener receta:', err.message);
    res.status(500).json({ error: 'Error al obtener receta' });
  }
};

// Crear receta
exports.createReceta = async (req, res) => {
  try {
    const nuevaReceta = await Receta.create({
      ...req.body,
      estado: 'en espera'
    });
    res.status(201).json(nuevaReceta);
  } catch (err) {
    console.error('Error al crear receta:', err.message);
    res.status(500).json({ error: 'Error al crear la receta' });
  }
};

// Actualizar receta
exports.updateReceta = async (req, res) => {
  try {
    const receta = await Receta.findByPk(req.params.id);
    if (!receta) return res.status(404).json({ error: 'Receta no encontrada' });
    await receta.update(req.body);
    res.json({ mensaje: 'Receta actualizada correctamente', receta });
  } catch (err) {
    console.error('Error al actualizar receta:', err.message);
    res.status(500).json({ error: 'Error al actualizar la receta' });
  }
};

// Eliminar receta
exports.deleteReceta = async (req, res) => {
  try {
    const receta = await Receta.findByPk(req.params.id);
    if (!receta) return res.status(404).json({ error: 'Receta no encontrada' });
    await receta.destroy();
    res.json({ mensaje: 'Receta eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar receta:', err.message);
    res.status(500).json({ error: 'Error al eliminar la receta' });
  }
};

// Subir imagen principal
exports.uploadFotoPrincipal = async (req, res) => {
  try {
    const { idReceta } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No se recibió archivo' });

    const receta = await Receta.findByPk(idReceta);
    if (!receta) return res.status(404).json({ error: 'Receta no encontrada' });

    const url = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    receta.fotoPrincipal = url;
    await receta.save();

    res.json({ mensaje: 'Imagen subida correctamente', receta });
  } catch (err) {
    console.error('Error al subir imagen principal:', err.message);
    res.status(500).json({ error: 'Error al subir imagen' });
  }
};

// Cargar receta con imagen
exports.uploadWithImage = async (req, res) => {
  try {
    const { idUsuario, nombreReceta, descripcionReceta, porciones, cantidadPersonas, idTipo } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No se subió imagen' });
    }

    const fotoPrincipal = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const nuevaReceta = await Receta.create({
      idUsuario,
      nombreReceta,
      descripcionReceta,
      fotoPrincipal,
      porciones,
      cantidadPersonas,
      idTipo,
      estado: 'en espera'
    });

    res.status(201).json(nuevaReceta);
  } catch (error) {
    console.error('Error al crear receta con imagen:', error);
    res.status(500).json({ error: 'Error al crear receta con imagen' });
  }
};