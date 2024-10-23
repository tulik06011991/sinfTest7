const express = require('express');
const { getResultsByFanId } = require('../controllers/Results');
const router = express.Router();

// Route to get results by fanId
router.get('/results/:fanId', getResultsByFanId);

module.exports = router;
