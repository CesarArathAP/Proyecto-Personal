const express = require('express');
const router = express.Router();
const { verificarToken } = require('../controllers/verificar_token');

// Definir la ruta POST para verificar el token
router.post('/', verificarToken);

module.exports = router;