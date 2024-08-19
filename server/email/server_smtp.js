const isOnlinePromise = import('is-online');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'cesararath1976@gmail.com',
        pass: 'fjdgjotfhlbvpsni'
    }
});

let emailQueue = [];

const sendEmail = async (to, subject, html, attachments = []) => {
    try {
        // Obtén el módulo is-online después de que esté cargado
        const isOnline = await isOnlinePromise;

        // Verificar conexión a Internet utilizando is-online
        const online = await isOnline.default();

        if (online) {
            await transporter.sendMail({
                from: 'cesararath1976@gmail.com',
                to,
                subject,
                html,
                attachments // Añadir los archivos adjuntos aquí
            });
            console.log('Correo enviado exitosamente');
        } else {
            emailQueue.push({ to, subject, html, attachments });
            console.log('Correo agregado a la cola');
        }
    } catch (error) {
        console.error('Error enviando el correo:', error);
    }
};

const processEmailQueue = async () => {
    try {
        const isOnline = await isOnlinePromise;

        const online = await isOnline.default();

        if (online && emailQueue.length > 0) {
            while (emailQueue.length > 0) {
                const { to, subject, html, attachments } = emailQueue.shift();
                await transporter.sendMail({
                    from: 'cesararath1976@gmail.com',
                    to,
                    subject,
                    html,
                    attachments // Añadir los archivos adjuntos aquí también
                });
                console.log('Correo enviado desde la cola');
            }
        }
    } catch (error) {
        console.error('Error procesando la cola de correos:', error);
    }
};

setInterval(processEmailQueue, 60000);

module.exports = sendEmail;