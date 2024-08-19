const ClientAuth = require('../models/ClientAuth');
const sendEmail = require('../email/server_smtp'); // Asume que tienes una función para enviar correos
const generateVerificationCode = require('../utils/generate_verification_code'); // Función que genera un código de 6 dígitos

const solicitarToken = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'El email es requerido' });
        }

        // Buscar al cliente por email
        const cliente = await ClientAuth.findOne({ email });

        if (!cliente) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Generar un código de verificación de 6 dígitos
        const verificationCode = generateVerificationCode();
        const verificationExpiration = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos

        // Guardar el código de verificación en la base de datos
        cliente.verification_code = verificationCode;
        cliente.verification_expiration = verificationExpiration;
        await cliente.save();

        // Enviar el código de verificación por email
        const subject = 'Código de verificación para restablecer contraseña';
        const html = `<p>Tu código de verificación es: <strong>${verificationCode}</strong></p><p>Este código es válido por 5 minutos.</p>`;
        await sendEmail(cliente.email, subject, html);

        res.status(200).json({ message: 'Código de verificación enviado' });
    } catch (error) {
        console.error('Error al solicitar token:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

module.exports = {
    solicitarToken
};