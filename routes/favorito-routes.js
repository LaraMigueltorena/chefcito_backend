const express = require('express');
const router = express.Router();
const favoritoController = require('../controllers/favorito-controller');

router.post('/', favoritoController.agregarFavorito);
router.delete('/', favoritoController.eliminarFavorito);
router.get('/:idUsuario', favoritoController.obtenerFavoritosDeUsuario);

module.exports = router;
