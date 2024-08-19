const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  nombre_completo: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  telefono: {
    type: String,
    required: false
  },
  direccion: {
    calle: {
      type: String,
      required: false
    },
    ciudad: {
      type: String,
      required: false
    },
    estado: {
      type: String,
      required: false
    },
    codigo_postal: {
      type: String,
      required: false
    }
  },
  credenciales: {
    usuario: {
      type: String,
      required: true,
      unique: true
    },
    contraseña: {
      type: String,
      required: true
    }
  },
  fecha_registro: {
    type: String,
    default: new Date().toISOString()
  },
  fecha_nacimiento: {
    type: String,
    required: false
  },
  genero: {
    type: String,
    enum: ['Masculino', 'Femenino', 'Otro'],
    required: false
  },
  notificaciones: [
    {
      mensaje: {
        type: String,
        required: true
      },
      fecha: {
        type: String,
        default: new Date().toISOString()
      },
      hora: {
        type: String,
        required: true
      }
    }
  ],
  // Campos para el token de restablecimiento de contraseña
  token: {
    type: String,
    required: false
  },
  token_expiration: {
    type: Date,
    required: false
  },
  // Campos para el código de verificación de 6 dígitos
  verification_code: {
    type: String,
    required: false
  },
  verification_expiration: {
    type: Date,
    required: false
  },
  // Campos para registrar intentos fallidos de verificación
  intentos_fallidos: {
    type: Number,
    default: 0
  },
  ultimo_intento_fallido: {
    type: Date,
    required: false
  }
});

const ClientAuth = mongoose.model('Clients', clientSchema);

module.exports = ClientAuth;