const express = require('express');
const router = express.Router();
const { deleteQuestionsByFanId } = require('../controllers/SavolVariantDelete'); // Controllerni import qilish

// fanId bo'yicha savollarni o'chirish
router.delete('/fan/:fanId', deleteQuestionsByFanId); // DELETE so'rovi uchun endpoint

module.exports = router;
