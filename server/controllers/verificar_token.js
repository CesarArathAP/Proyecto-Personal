const ClientAuth = require('../models/ClientAuth');

const verificarToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Token no proporcionado' });
    }

    // Buscar al cliente por el token
    const cliente = await ClientAuth.findOne({ token }).lean();

    if (!cliente) {
      return res.status(404).json({ message: 'Token no existe' });
    }

    // Verificar si el token ha expirado
    if (new Date() > new Date(cliente.token_expiration)) {
      return res.status(401).json({ message: 'Token expirado' });
    }

    // Si el token es válido, devolver el mensaje de éxito
    res.status(200).json({ message: 'Token válido' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

module.exports = {
  verificarToken
};