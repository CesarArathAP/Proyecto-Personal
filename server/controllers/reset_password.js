const ClientAuth = require('../models/ClientAuth'); // Importa el modelo de clientes
const sendEmail = require('../email/server_smtp'); // Importa la función para enviar correos
const ResetPasswordEmail = require('../utils/reset_passwordMensaje'); // Importa la función para generar el HTML del correo

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
        cliente.token = null;
        cliente.token_expiration = null;
        await cliente.save();

        // Enviar un correo de notificación al usuario
        const subject = 'Contraseña restablecida exitosamente';
        const html = ResetPasswordEmail(cliente.nombre_completo, nuevaContraseña);

        await sendEmail(cliente.email, subject, html);

        return res.status(200).json({ message: 'Contraseña restablecida exitosamente y correo de notificación enviado' });
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        return res.status(500).json({ message: 'Error del servidor' });
    }
};

// Exportar el controlador
module.exports = { resetPassword };