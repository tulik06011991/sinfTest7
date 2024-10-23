const express = require('express');
const router = express.Router();
const { getQuestionsByFanId } = require('../controllers/savollar');

// Fan ID ga muvofiq savollarni olish
router.get('/questions/:fanId', getQuestionsByFanId);

module.exports = router;
