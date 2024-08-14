const crypto = require('crypto');

// Función para generar un token aleatorio de 32 caracteres
function generateToken() {
  return crypto.randomBytes(16).toString('hex'); // Genera un token de 32 caracteres
}

module.exports = generateToken;