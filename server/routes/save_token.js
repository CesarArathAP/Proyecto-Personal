const express = require('express');
const router = express.Router();
const { saveToken } = require('../controllers/save_token');

router.post('/', saveToken);

module.exports = router;