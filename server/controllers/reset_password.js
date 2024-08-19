// Importar los módulos necesarios
const ClientAuth = require('../models/ClientAuth'); // Importa el modelo de clientes

const resetPassword = async (req, res) => {
    try {
        const { token, email, nuevaContraseña } = req.body;

        // Verificar que se proporcionen el token, email y la nueva contraseña
        if (!token || !email || !nuevaContraseña) {
            return res.status(400).json({ message: 'Token, email y nueva contraseña son requeridos' });
        }

        // Buscar al cliente por el token y el email
        const cliente = await ClientAuth.findOne({ token, email });

        if (!cliente) {
            return res.status(400).json({ message: 'Token o email inválidos' });
        }

        // Verificar si el token ha expirado
        const currentDate = new Date();
        if (cliente.token_expiration < currentDate) {
            return res.status(400).json({ message: 'El token ha expirado' });
        }

        // Actualizar la contraseña
        cliente.credenciales.contraseña = nuevaContraseña;
        // cliente.token = null;
        // cliente.token_expiration = null;
        await cliente.save();

        return res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        return res.status(500).json({ message: 'Error del servidor' });
    }
};

// Exportar el controlador
module.exports = { resetPassword };