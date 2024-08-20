module.exports = function ResetPasswordEmail(nombre_completo, nuevaContraseña) {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contraseña Restablecida</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333333; margin: 0; padding: 0;">
          <div style="width: 100%; max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border: 1px solid #ddd;">
              <div style="display: flex; align-items: center; border-left: 6px solid #007bff; padding-left: 20px; margin-bottom: 20px;">
                  <h1 style="color: #007bff; font-size: 26px; font-weight: bold; margin: 0;">Contraseña Restablecida</h1>
              </div>
              <p style="font-size: 18px; line-height: 1.6; margin-bottom: 20px;">Hola ${nombre_completo},</p>
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Te notificamos que tu contraseña ha sido restablecida exitosamente.</p>
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Tu nueva contraseña es: <strong>${nuevaContraseña}</strong></p>
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Si no realizaste esta acción, por favor contáctanos de inmediato para asegurar la seguridad de tu cuenta.</p>
              <p style="font-size: 16px; line-height: 1.6;">Gracias por tu atención.</p>
              <p style="font-size: 16px; line-height: 1.6;">Atentamente,<br>El equipo de soporte de Papelería LeyCes</p>
              <div style="margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px; font-size: 14px; color: #666; text-align: center;">

                  <p>&copy; 2024 Papelería LeyCes. Todos los derechos reservados.</p>
              </div>
          </div>
      </body>
      </html>
    `;
};