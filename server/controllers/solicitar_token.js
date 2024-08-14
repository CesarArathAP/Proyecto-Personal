const ClientAuth = require('../models/ClientAuth');
const generateToken = require('../utils/generar_token');

const solicitarToken = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
      return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
    }

    // Buscar al cliente por usuario
    const cliente = await ClientAuth.findOne({ 'credenciales.usuario': usuario });

    if (!cliente) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    if (cliente.credenciales.contraseña !== contraseña) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar un nuevo token usando la función importada
    const token = generateToken();
    const token_expiration = new Date(Date.now() + 60 * 60 * 1000); // Token válido por 1 hora

    // Guardar el token y su fecha de expiración en la base de datos
    cliente.token = token;
    cliente.token_expiration = token_expiration;
    await cliente.save();

    res.status(200).json({ message: 'Token generado', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

module.exports = {
  solicitarToken
};