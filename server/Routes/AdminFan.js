const express = require('express');
const router = express.Router();
const { createFan } = require('../controllers/AdminFan');

// Fan yaratish route
router.post('/create', createFan);

module.exports = router;
