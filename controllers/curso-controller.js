const Curso = require('../models/curso-model');

exports.getAll = async (req, res) => {
  try {
    const data = await Curso.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener cursos' });
  }
};

exports.getById = async (req, res) => {
  const item = await Curso.findByPk(req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'No encontrado' });
};

exports.create = async (req, res) => {
  try {
    const nuevo = await Curso.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear' });
  }
};

exports.update = async (req, res) => {
  const item = await Curso.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.update(req.body);
  res.json({ mensaje: 'Actualizado', item });
};

exports.delete = async (req, res) => {
  const item = await Curso.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.destroy();
  res.json({ mensaje: 'Eliminado' });
};

exports.uploadImagen = async (req, res) => {
  try {
    const idCurso = req.params.id;

    if (!req.file) {
      return res.status(400).json({ error: 'No se envió ninguna imagen' });
    }

    const curso = await Curso.findByPk(idCurso);
    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    
    curso.imagen = `/uploads/cursos/${req.file.filename}`;
    await curso.save();

    res.json({ mensaje: 'Imagen subida correctamente', curso });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al subir imagen del curso' });
  }
};

