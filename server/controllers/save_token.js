const ClientAuth = require('../models/ClientAuth');
const generateToken = require('../utils/generar_token');
const TokenEmail = require('../utils/mensajeToken');
const sendEmail = require('../email/server_smtp'); // Asegúrate de tener la función de envío de correo

const saveToken = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;

        if (!email || !verificationCode) {
            return res.status(400).json({ message: 'Email y código de verificación son requeridos' });
        }

        // Buscar al cliente por email
        const cliente = await ClientAuth.findOne({ email });

        if (!cliente) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si el código de verificación es válido
        const currentDate = new Date();
        if (
            cliente.verification_code !== verificationCode ||
            cliente.verification_expiration < currentDate
        ) {
            return res.status(400).json({ message: 'Código de verificación inválido o expirado' });
        }

        // Generar un token válido por 30 minutos
        const token = generateToken();
        const tokenExpiration = new Date(Date.now() + 30 * 60 * 1000);

        // Guardar el token y limpiar el código de verificación
        cliente.token = token;
        cliente.token_expiration = tokenExpiration;
        cliente.verification_code = null;
        cliente.verification_expiration = null;
        await cliente.save();

        // Enviar el correo con el token
        const subject = 'Token de Verificación';
        const html = TokenEmail(cliente.nombre_completo, token);

        await sendEmail(cliente.email, subject, html);

        res.status(200).json({ message: 'Token generado y correo enviado', token });
    } catch (error) {
        console.error('Error al guardar token:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

module.exports = {
    saveToken
};