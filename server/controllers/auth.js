const ClientAuth = require('../models/ClientAuth');
const { v4: uuidv4 } = require('uuid');

const login = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    // Buscar el cliente por nombre de usuario
    const cliente = await ClientAuth.findOne({ 'credenciales.usuario': usuario }).lean();

    if (!cliente) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const MAX_INTENTOS = 5;
    const TIEMPO_BLOQUEO = 30 * 1000; // 30 segundos

    // Verificar si el cliente está bloqueado
    if (cliente.intentos_fallidos >= MAX_INTENTOS) {
      const tiempo_desde_ultimo_intento = Date.now() - new Date(cliente.ultimo_intento_fallido).getTime();
      if (tiempo_desde_ultimo_intento < TIEMPO_BLOQUEO) {
        return res.status(429).json({ message: 'Demasiados intentos fallidos. Inténtelo de nuevo más tarde.' });
      } else {
        // Resetear los intentos fallidos después del tiempo de bloqueo
        await ClientAuth.updateOne({ 'credenciales.usuario': usuario }, { intentos_fallidos: 0 });
      }
    }

    // Comparar la contraseña directamente
    if (cliente.credenciales.contraseña !== contraseña) {
      // Incrementar el conteo de intentos fallidos
      await ClientAuth.updateOne(
        { 'credenciales.usuario': usuario },
        { 
          $inc: { intentos_fallidos: 1 }, 
          $set: { ultimo_intento_fallido: new Date() } 
        }
      );
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Si la autenticación es exitosa, restablecer los intentos fallidos y generar un token
    await ClientAuth.updateOne({ 'credenciales.usuario': usuario }, { intentos_fallidos: 0 });

    // Generar un token único de 32 caracteres
    const token = uuidv4().replace(/-/g, '').slice(0, 32);

    // Establecer la expiración del token a 1 hora
    const token_expiration = new Date(Date.now() + 60 * 60 * 1000); // 1 hora desde ahora

    // Actualizar el cliente con el token y la fecha de expiración
    await ClientAuth.updateOne(
      { 'credenciales.usuario': usuario },
      { 
        token,
        token_expiration 
      }
    );

    // Eliminar el campo __v del objeto cliente
    delete cliente.__v;

    // Devolver el token junto con la información del cliente
    res.status(200).json({ ...cliente, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

module.exports = {
  login
};