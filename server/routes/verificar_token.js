const express = require('express');
const router = express.Router();
const { verificarToken } = require('../controllers/verificar_token');

// Definir la ruta para verificar el token
router.post('/', verificarToken);

module.exports = router;