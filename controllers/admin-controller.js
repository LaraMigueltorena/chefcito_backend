const Administrador = require('../models/admin-model');
const Usuario = require('../models/usuario-model');

exports.getAll = async (req, res) => {
  try {
    const data = await Administrador.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener administradores' });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Administrador.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar administrador' });
  }
};

exports.create = async (req, res) => {
  try {
    const { usuarioId } = req.body;

    // ✅ Evitar duplicados
    const yaExiste = await Administrador.findOne({ where: { usuarioId } });
    if (yaExiste) {
      return res.status(400).json({ error: 'Este usuario ya es administrador' });
    }

    const nuevo = await Administrador.create({ usuarioId });

    // 🔁 Cambiar el rol del usuario a 'admin'
    await Usuario.update({ rol: 'admin' }, { where: { idUsuario: usuarioId } });

    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear administrador' });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Administrador.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    await item.update(req.body);
    res.json({ mensaje: 'Administrador actualizado', item });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar administrador' });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await Administrador.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });

    // ⚠️ Al eliminar el admin, opcionalmente bajás el rol
    await Usuario.update({ rol: 'usuario' }, { where: { idUsuario: item.usuarioId } });
    await item.destroy();

    res.json({ mensaje: 'Administrador eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar administrador' });
  }
};
