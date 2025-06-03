const Alumno = require('../models/alumno-model');
const Usuario = require('../models/usuario-model');

exports.getAll = async (req, res) => {
  try {
    const data = await Alumno.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener Alumnos' });
  }
};

exports.getById = async (req, res) => {
  const item = await Alumno.findByPk(req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'No encontrado' });
};

exports.create = async (req, res) => {
  try {
    const nuevo = await Alumno.create(req.body);

    await Usuario.update(
      { rol: 'alumno' },
      { where: { idUsuario: req.body.usuarioId } }
    );

    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el alumno' });
  }
};

exports.update = async (req, res) => {
  const item = await Alumno.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.update(req.body);
  res.json({ mensaje: 'Actualizado', item });
};

exports.delete = async (req, res) => {
  const item = await Alumno.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.destroy();
  res.json({ mensaje: 'Eliminado' });
};
