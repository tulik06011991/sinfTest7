const express = require('express');
const multer = require('multer');
const quizController = require('../controllers/faylYuklash');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Yuklangan fayllar uchun papka

// Word faylini yuklash va savollarni saqlash uchun marshrut
router.post('/upload', upload.single('file'), quizController.uploadQuiz);
module.exports = router;
