const Usuario = require('../models/usuario-model');
const Alumno = require('../models/alumno-model');
const Admin = require('../models/admin-model');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const codigosVerificacion = {}; 
const codigosRecuperacion = {};

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    console.error('Error al obtener usuarios:', err.message);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar usuario' });
  }
};

exports.createUsuario = async (req, res) => {
  try {
    const { password, ...otrosCampos } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevo = await Usuario.create({
      ...otrosCampos,
      password: hashedPassword
    });

    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear el usuario', detalles: err.message });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (parseInt(id) !== req.user.id && req.user.rol !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const updateData = { ...req.body };
    
    if (updateData.rol && req.user.rol !== 'admin') {
      return res.status(403).json({ error: 'No tenés permiso para cambiar el rol' });
    }

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    await usuario.update(updateData);
    res.json({ mensaje: 'Usuario actualizado', usuario });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

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

exports.sugerenciasAlias = async (req, res) => {
  const { base } = req.body;

  if (!base) return res.status(400).json({ error: 'Alias base requerido' });

  const sugerencias = [];
  const intentosMax = 15;

  for (let i = 0; i < intentosMax && sugerencias.length < 4; i++) {
    const aleatorio = Math.floor(100 + Math.random() * 900);
    const alias = `${base}${aleatorio}`;

    const yaExiste = await Usuario.findOne({ where: { nickname: alias } });
    if (!yaExiste) sugerencias.push(alias);
  }

  if (sugerencias.length === 0) {
    return res.status(500).json({ error: 'No se pudieron generar sugerencias disponibles' });
  }

  return res.json({ sugerencias });
};

exports.verificarEmailYAlias = async (req, res) => {
  const { mail, nickname } = req.body;

  try {
    const existeMail = await Usuario.findOne({ where: { mail } });
    const existeAlias = await Usuario.findOne({ where: { nickname } });

    if (existeMail) return res.status(400).json({ error: 'El correo ya está registrado' });
    if (existeAlias) return res.status(400).json({ error: 'El alias ya está en uso' });

    const codigo = Math.floor(1000 + Math.random() * 9000);
    codigosVerificacion[mail] = codigo;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: 'Chefcito 🍳',
      to: mail,
      subject: 'Código de verificación',
      text: `Tu código de verificación es: ${codigo}`
    };

    await transporter.sendMail(mailOptions);

    res.json({ mensaje: 'Código enviado correctamente' });
  } catch (err) {
    console.error('Error al verificar email/alias:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.verificarCodigo = async (req, res) => {
  const { mail, codigo } = req.body;

  if (codigosVerificacion[mail] && codigosVerificacion[mail] === parseInt(codigo)) {
    delete codigosVerificacion[mail];
    return res.json({ verificado: true });
  }

  return res.status(400).json({ error: 'Código incorrecto' });
};

exports.enviarCodigoRecuperacion = async (req, res) => {
  const { mail } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { mail } });
    if (!usuario) return res.status(404).json({ error: 'Correo no registrado' });

    const codigo = Math.floor(1000 + Math.random() * 9000);
    const vencimiento = Date.now() + 30 * 60 * 1000; 

    codigosRecuperacion[mail] = { codigo, vencimiento };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'Chefcito 🍳',
      to: mail,
      subject: 'Recuperación de contraseña',
      text: `Tu código de recuperación es: ${codigo}. Este código vence en 30 minutos.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ mensaje: 'Código de recuperación enviado correctamente' });
  } catch (err) {
    console.error('Error al enviar código de recuperación:', err);
    res.status(500).json({ error: 'Error al enviar el código de recuperación' });
  }
};

exports.verificarCodigoRecuperacion = async (req, res) => {
  const { mail, codigo } = req.body;

  const info = codigosRecuperacion[mail];
  if (!info) return res.status(400).json({ error: 'No se solicitó recuperación para este mail' });

  const ahora = Date.now();

  if (ahora > info.vencimiento) {
    delete codigosRecuperacion[mail];
    return res.status(400).json({ error: 'Código expirado. Solicitá uno nuevo.' });
  }

  if (parseInt(codigo) !== info.codigo) {
    return res.status(400).json({ error: 'Código incorrecto' });
  }

  delete codigosRecuperacion[mail];
  return res.json({ verificado: true });
};

exports.resetPassword = async (req, res) => {
  const { mail, nuevaPassword } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { mail } });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const hashed = await bcrypt.hash(nuevaPassword, 10);
    usuario.password = hashed;
    await usuario.save();

    res.json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al restablecer la contraseña' });
  }
};

exports.changePassword = async (req, res) => {
  const { actualPassword, nuevaPassword } = req.body;
  const usuarioId = req.user.id;

  try {
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(actualPassword, usuario.password);
    if (!valid) return res.status(401).json({ error: 'Contraseña actual incorrecta' });

    const nuevaHash = await bcrypt.hash(nuevaPassword, 10);
    usuario.password = nuevaHash;
    await usuario.save();

    res.json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al cambiar la contraseña' });
  }
};

exports.login = async (req, res) => {
  const { mail, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { mail } });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, usuario.password);
    if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: usuario.idUsuario, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    let datos = null;
    if (usuario.rol === 'alumno') {
      datos = await Alumno.findOne({ where: { usuarioId: usuario.idUsuario } });
    } else if (usuario.rol === 'admin') {
      datos = await Admin.findOne({ where: { usuarioId: usuario.idUsuario } });
    }

    res.json({ token, usuario: { id: usuario.idUsuario, rol: usuario.rol, mail: usuario.mail }, datos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.actualizarConexion = async (req, res) => {
  const { id } = req.params;
  const { conexion } = req.body;

  if (!['internet', 'datos', 'sin'].includes(conexion)) {
    return res.status(400).json({ error: 'Valor de conexión inválido' });
  }

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    usuario.conexion = conexion;
    await usuario.save();

    res.json({ mensaje: 'Conexión actualizada', conexion: usuario.conexion });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar conexión' });
  }
};
