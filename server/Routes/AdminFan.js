const express = require('express');
const router = express.Router();
const { createFan } = require('../controllers/fanController');

// Fan yaratish route
router.post('/create', createFan);

module.exports = router;
