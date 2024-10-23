const express = require('express');
const router = express.Router();
const { getQuestionsWithOptionsByFanId } = require('../controllers/savollar');

// Fan ID ga muvofiq savollarni olish
router.get('/questions/:fanId', getQuestionsWithOptionsByFanId);

module.exports = router;
