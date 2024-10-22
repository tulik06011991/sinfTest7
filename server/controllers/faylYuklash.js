const fs = require('fs');
const mammoth = require('mammoth');
const Question = require('../models/Questions');
const Option = require('../models/Options');

// Word faylini yuklab, JSON formatga o'tkazish va savollarni va variantlarni ajratish
exports.uploadQuiz = async (req, res) => {
    try {
        // Word faylini o'qing
        const filePath = req.file.path;
        const result = await mammoth.extractRawText({ path: filePath });
        const content = result.value; // Worddan olingan toza matn

        // Savollar va variantlarni saqlash uchun bo'sh massivlar
        const questions = [];
        const lines = content.split('\n').filter(line => line.trim() !== '');

        let currentQuestion = null;

        for (let line of lines) {
            line = line.trim();

            // Savollarni ajratib olish
            const questionRegex = /^\d+\.\s.+[\.\?]$/;
            if (questionRegex.test(line)) {
                if (currentQuestion) {
                    questions.push(currentQuestion);
                }
                currentQuestion = {
                    text: line,
                    options: []
                };
            }

            // Variantlarni ajratib olish
            const optionRegex = /^[A-D]\)\s.+/;
            if (optionRegex.test(line)) {
                const isCorrect = /^\.\s[A-D]\)/.test(line);  // Oldida . bor bo'lsa, to'g'ri variant
                const optionText = line.replace(/^\.\s/, ''); // Nuqtani olib tashlaymiz
                if (currentQuestion) {
                    currentQuestion.options.push({ text: optionText, isCorrect });
                }
            }
        }

        // So'nggi savolni qo'shish
        if (currentQuestion) {
            questions.push(currentQuestion);
        }

        // Saqlash
        for (let questionData of questions) {
            const newQuestion = new Question({ text: questionData.text });
            await newQuestion.save();

            for (let optionData of questionData.options) {
                const newOption = new Option({
                    text: optionData.text,
                    isCorrect: optionData.isCorrect,
                    question: newQuestion._id
                });
                await newOption.save();
                newQuestion.options.push(newOption._id);
            }

            await newQuestion.save();
        }

        res.status(200).json({ message: 'Savollar muvaffaqiyatli yuklandi!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Xatolik yuz berdi!' });
    }
};
