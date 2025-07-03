const Ingrediente = require('../models/ingrediente-model');

exports.getAll = async (req, res) => {
  try {
    const data = await Ingrediente.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ingredientes' });
  }
};

exports.searchByName = async (req, res) => {
  try {
    const { nombre } = req.query;

    if (!nombre) {
      return res.status(400).json({ error: 'Falta el parámetro "nombre"' });
    }

    const ingredientes = await Ingrediente.findAll({
      where: {
        nombre: {
          [require('sequelize').Op.like]: `%${nombre}%`
        }
      }
    });

    res.json(ingredientes);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar ingredientes por nombre' });
  }
};

exports.getById = async (req, res) => {
  const item = await Ingrediente.findByPk(req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'No encontrado' });
};

exports.create = async (req, res) => {
  try {
    const nuevo = await Ingrediente.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear' });
  }
};

exports.update = async (req, res) => {
  const item = await Ingrediente.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.update(req.body);
  res.json({ mensaje: 'Actualizado', item });
};

exports.delete = async (req, res) => {
  const item = await Ingrediente.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.destroy();
  res.json({ mensaje: 'Eliminado' });
};
