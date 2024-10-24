const express = require('express');
const { getResultsByFanId, deleteUserResults } = require('../controllers/Results');
const router = express.Router();

// Route to get results by fanId
router.get('/results/:fanId', getResultsByFanId);

// User ID bo'yicha natijalarni o'chirish
router.delete('/results/:userId', deleteUserResults);

module.exports = router;
