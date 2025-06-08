const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario-controller');
const verifyToken = require('../middlewares/auth');

// CRUD de usuarios
router.get('/', usuarioController.getAllUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/', usuarioController.createUsuario);
router.put('/:id', verifyToken, usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

// Verificación de correo/alias
router.post('/verificar-email', usuarioController.verificarEmailYAlias);
router.post('/verificar-codigo', usuarioController.verificarCodigo);
router.post('/sugerencias-alias', usuarioController.sugerenciasAlias);


// Autenticación
router.post('/login', usuarioController.login);
router.post('/reset-password', usuarioController.resetPassword);
router.post('/change-password', verifyToken, usuarioController.changePassword);

//  Recuperación de contraseña
router.post('/recuperar-codigo', usuarioController.enviarCodigoRecuperacion);
router.post('/verificar-codigo-recuperacion', usuarioController.verificarCodigoRecuperacion);

module.exports = router;
