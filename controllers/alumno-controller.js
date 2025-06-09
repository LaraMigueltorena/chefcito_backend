// controllers/alumno-controller.js
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
exports.createWithImages = async (req, res) => {
  try {
    console.log('🟡 BODY:', req.body);
    console.log('🟡 FILES:', req.files);

    const frente = req.files['dniFrente']?.[0];
    const dorso = req.files['dniDorso']?.[0];

    if (!frente || !dorso) {
      return res.status(400).json({ error: 'Faltan imágenes del DNI.' });
    }

    const nuevo = await Alumno.create({
      usuarioId: parseInt(req.body.usuarioId, 10),
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      numeroTarjeta: req.body.numeroTarjeta,
      codigoSeguridad: req.body.codigoSeguridad,
      numeroDeTramite: req.body.numeroDeTramite,
      dniFrente: frente.path,
      dniDorso: dorso.path,
    });

    await Usuario.update(
      { rol: 'alumno' },
      { where: { idUsuario: req.body.usuarioId } }
    );

    console.log('✅ Alumno creado con imágenes:', nuevo);

    res.status(201).json(nuevo);
  } catch (err) {
    console.error('🔥 Error en createWithImages:', err);
    res.status(500).json({ error: 'Error al registrar alumno con imágenes' });
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
