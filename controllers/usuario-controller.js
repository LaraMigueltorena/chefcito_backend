const Usuario = require('../models/usuario-model');

// GET all
exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    console.error('Error al obtener usuarios:', err.message);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// GET one
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar usuario' });
  }
};

// POST
exports.createUsuario = async (req, res) => {
  try {
    const nuevo = await Usuario.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// PUT
exports.updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    await usuario.update(req.body);
    res.json({ mensaje: 'Usuario actualizado', usuario });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// DELETE
exports.deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    await usuario.destroy();
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};
