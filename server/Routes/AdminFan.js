const express = require('express');
const router = express.Router();
const { createFan, getAllFans } = require('../controllers/AdminFan');

// Fan yaratish route
router.post('/create', createFan);
router.get('/adminFan', getAllFans )

module.exports = router;
