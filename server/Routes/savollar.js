const express = require('express');
const router = express.Router();
const { getQuestionsWithOptions } = require('../controllers/savollar');

// Fan ID ga muvofiq savollarni olish
router.get('/questions/:fanId', getQuestionsWithOptions);

module.exports = router;
