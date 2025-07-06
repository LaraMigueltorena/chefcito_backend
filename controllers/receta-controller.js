// 📁 controllers/receta-controller.js

const path = require('path');
const { Op } = require('sequelize');
const Receta = require('../models/receta-model');
const Usuario = require('../models/usuario-model');



// Obtener todas las recetas con filtros opcionales
exports.getAllRecetas = async (req, res) => {
  try {
    const { nombre, orden, estado } = req.query;

  const whereClause = {};
  if (nombre) {
    whereClause.nombreReceta = { [Op.like]: `%${nombre}%` };
  }
  if (estado) {
    whereClause.estado = estado;
  }


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

exports.updateReceta = async (req, res) => {
  try {
    const receta = await Receta.findByPk(req.params.id);
    if (!receta) return res.status(404).json({ error: 'Receta no encontrada' });

    // Validación de cambio de estado
    if (req.body.estado) {
      const estadoActual = receta.estado;
      const nuevoEstado = req.body.estado;

      const cambiosValidos = {
        'en espera': ['aprobada', 'rechazada'],
        'rechazada': ['aprobada'],
        'aprobada': [] // No se puede cambiar una vez aprobada
      };

      if (!cambiosValidos[estadoActual].includes(nuevoEstado)) {
        return res.status(400).json({
          error: `No se puede cambiar el estado de "${estadoActual}" a "${nuevoEstado}"`
        });
      }
    }

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

// Obtener recetas en espera
exports.getRecetasEnEspera = async (req, res) => {
  try {
    const recetas = await Receta.findAll({
      where: { estado: 'en espera' },
      order: [['idReceta', 'DESC']],
      include: {
        model: Usuario,
        attributes: ['nickname']
      }
    });
    res.json(recetas);
  } catch (err) {
    console.error('Error al obtener recetas en espera:', err.message);
    res.status(500).json({ error: 'Error al obtener recetas en espera' });
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

// Obtener todas las recetas de un usuario por su ID
exports.getRecetasPorUsuario = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    const recetas = await Receta.findAll({
      where: { idUsuario },
      order: [['idReceta', 'DESC']],
      include: {
        model: Usuario,
        attributes: ['nickname']
      }
    });

    res.json(recetas);
  } catch (err) {
    console.error('Error al obtener recetas del usuario:', err.message);
    res.status(500).json({ error: 'Error al obtener recetas del usuario' });
  }
};

exports.updateWithImage = async (req, res) => {
  try {
    const { id } = req.params;
    const receta = await Receta.findByPk(id);
    if (!receta) return res.status(404).json({ error: 'Receta no encontrada' });

    const {
      nombreReceta,
      descripcionReceta,
      porciones,
      cantidadPersonas,
      idTipo
    } = req.body;

    const fotoPrincipal = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : receta.fotoPrincipal;

    const estado = 'en espera';

    await receta.update({
      nombreReceta,
      descripcionReceta,
      porciones,
      cantidadPersonas,
      idTipo,
      fotoPrincipal,
      estado,
    });

    res.json({ mensaje: 'Receta actualizada correctamente', receta });
  } catch (error) {
    console.error('Error al actualizar receta con imagen:', error);
    res.status(500).json({ error: 'Error al actualizar la receta con imagen' });
  }
};

// Obtener recetas por idTipo (tipo de comida)
exports.getRecetasPorTipo = async (req, res) => {
  try {
    const { idTipo } = req.params;

    const recetas = await Receta.findAll({
      where: { idTipo, estado: 'aprobada' },
      include: {
        model: Usuario,
        attributes: ['nickname']
      },
      order: [['idReceta', 'DESC']]
    });

    res.json(recetas);
  } catch (error) {
    console.error('Error al obtener recetas por tipo:', error.message);
    res.status(500).json({ error: 'Error al obtener recetas por tipo' });
  }
};
