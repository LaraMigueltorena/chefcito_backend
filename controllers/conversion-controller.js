const Conversion = require('../models/conversion-model');

// Obtener todas las conversiones
exports.getAll = async (req, res) => {
  try {
    const data = await Conversion.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener conversiones' });
  }
};

// Obtener una conversión por ID
exports.getById = async (req, res) => {
  const item = await Conversion.findByPk(req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'No encontrado' });
};

// Obtener conversiones por usuario
exports.getByUsuario = async (req, res) => {
  try {
    const data = await Conversion.findAll({
      where: { idUsuario: req.params.idUsuario }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener conversiones del usuario' });
  }
};

// Crear una nueva conversión
exports.create = async (req, res) => {
  try {
    const { idUsuario } = req.body;

    // Contar cuántas conversiones tiene el usuario
    const total = await Conversion.count({ where: { idUsuario } });

    if (total >= 10) {
      return res.status(400).json({ error: 'Solo se pueden guardar hasta 10 conversiones por usuario' });
    }

    // Crear nueva conversión
    const nueva = await Conversion.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la conversión' });
  }
};


// Eliminar una conversión
exports.delete = async (req, res) => {
  const item = await Conversion.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.destroy();
  res.json({ mensaje: 'Conversión eliminada' });
};
