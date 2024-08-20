module.exports = function VerificationEmail(verificationCode) {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Código de Verificación</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333333; margin: 0; padding: 0;">
          <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <div style="background-color: #f9f9f9; border-left: 4px solid #0056b3; padding: 20px; margin: 20px 0;">
                  <h3 style="color: #0056b3; margin-top: 0;">Código de Verificación</h3>
                  <p style="font-size: 16px; line-height: 1.6; color: #333;">Hemos recibido una solicitud para restablecer tu contraseña. Usa el siguiente código de verificación para completar el proceso:</p>
                  <div style="font-size: 24px; font-weight: bold; color: #ffffff; background-color: #0056b3; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
                      ${verificationCode}
                  </div>
                  <p style="font-size: 16px; line-height: 1.6; color: #333;">Este código es válido por <strong>5 minutos</strong>. Si no solicitaste un restablecimiento de contraseña, puedes ignorar este correo electrónico.</p>
                  <p style="font-size: 16px; line-height: 1.6; color: #333;">Gracias por confiar en nosotros.</p>
                  <p style="font-size: 16px; line-height: 1.6; color: #333;">Atentamente,<br>El equipo de soporte de Papeleria LeyCes</p>
              </div>
              <div style="text-align: center; font-size: 12px; color: #777777; margin-top: 20px;">
                  <p>&copy; 2024 Papeleria LeyCes. Todos los derechos reservados.</p>
              </div>
          </div>
      </body>
      </html>
    `;
};