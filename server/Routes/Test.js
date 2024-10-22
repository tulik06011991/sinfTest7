const express = require('express');
const router = express.Router();
const quizController = require('../controllers/Test'); // Controller'ni import qilish

// Fanlar ro'yxatini olish
router.get('/fanlar', quizController.getFanlar);

// Tanlangan fan bo'yicha savollar va variantlarni olish
router.get('/savollar/:fanId', quizController.getSavollarByFan);

// Foydalanuvchi javoblarini yuborish va natijalarni tekshirish
router.post('/tekshirJavoblar', quizController.checkAnswers);

module.exports = router;
