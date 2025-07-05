const Favorito = require('../models/favorito-model');

exports.agregarFavorito = async (req, res) => {
  const { idUsuario, idReceta } = req.body;

  try {
    const yaExiste = await Favorito.findOne({ where: { idUsuario, idReceta } });
    if (yaExiste) return res.status(409).json({ mensaje: 'Ya está en favoritos' });

    const nuevo = await Favorito.create({ idUsuario, idReceta });
    res.status(201).json(nuevo);
  } catch (err) {
    console.error('Error al agregar favorito:', err);
    res.status(500).json({ error: 'Error al agregar favorito' });
  }
};

exports.eliminarFavorito = async (req, res) => {
  const { idUsuario, idReceta } = req.body;

  try {
    const eliminado = await Favorito.destroy({ where: { idUsuario, idReceta } });
    if (eliminado) {
      res.json({ mensaje: 'Eliminado de favoritos' });
    } else {
      res.status(404).json({ mensaje: 'No encontrado en favoritos' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar favorito' });
  }
};

exports.obtenerFavoritosDeUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const favoritos = await Favorito.findAll({ where: { idUsuario } });
    res.json(favoritos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener favoritos' });
  }
};
