const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario-controller');
const verifyToken = require('../middlewares/auth');


router.get('/', usuarioController.getAllUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/', usuarioController.createUsuario);
router.put('/:id', verifyToken, usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);
router.post('/verificar-email', usuarioController.verificarEmailYAlias);
router.post('/verificar-codigo', usuarioController.verificarCodigo);
router.post('/sugerencias-alias', usuarioController.sugerenciasAlias);
router.post('/login', usuarioController.login);
router.post('/reset-password', usuarioController.resetPassword);
router.post('/change-password', verifyToken, usuarioController.changePassword);
router.post('/recuperar-codigo', usuarioController.enviarCodigoRecuperacion);
router.post('/verificar-codigo-recuperacion', usuarioController.verificarCodigoRecuperacion);
router.patch('/:id/conexion', usuarioController.actualizarConexion);


module.exports = router;
