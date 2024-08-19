const express = require('express');
const router = express.Router();
const { resetPassword } = require('../controllers/reset_password');

// Ruta para restablecer la contraseña
router.post('/', resetPassword);

module.exports = router;