const ClientAuth = require('../models/ClientAuth');

const login = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    // Buscar al cliente por nombre de usuario
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

    // Si la autenticación es exitosa, restablecer los intentos fallidos
    await ClientAuth.updateOne({ 'credenciales.usuario': usuario }, { intentos_fallidos: 0 });

    // Eliminar el campo __v del objeto cliente
    delete cliente.__v;

    // Devolver la información del cliente sin generar token
    res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

module.exports = {
  login
};