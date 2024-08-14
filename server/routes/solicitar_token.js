const express = require('express');
const router = express.Router();
const { solicitarToken } = require('../controllers/solicitar_token');

router.post('/', solicitarToken);

module.exports = router;