const fs = require('fs');
const path = require('path');
const Question = require('../models/Questions');
const Option = require('../models/Options');
const mammoth = require('mammoth');

// Fayldan matn olish va tahlil qilish funksiyasi
exports.extractAndSave = async (req, res) => {
    try {
        const { fanId } = req.body;

        if (!fanId) {
            return res.status(400).json({
                message: "Fan ID kiritilishi shart!"
            });
        }

        const filePath = path.join(__dirname, '../', req.file.path);
        const result = await mammoth.extractRawText({ path: filePath });
        const text = result.value;

        const lines = text.split('\n');
        let currentQuestion = null;

        for (let line of lines) {
            line = line.trim();

            if (/^\d+\./.test(line) && /[.?]$/.test(line)) {
                currentQuestion = new Question({
                    questionText: line,
                    fanId: fanId
                });
                await currentQuestion.save();
            } 
            else if (/^[A-D]\)/.test(line) || /^\.[A-D]\)/.test(line)) {
                if (!currentQuestion) {
                    return res.status(400).json({
                        message: "Variantlarni saqlashdan oldin savol kiritilishi kerak!"
                    });
                }

                const isCorrect = /^\.[A-D]\)/.test(line);
                const optionText = line.replace(/^\.[A-D]\)/, '').replace(/^[A-D]\)/, '').trim();

                const newOption = new Option({
                    optionText: optionText,
                    isCorrect: isCorrect,
                    question: currentQuestion._id,
                    fanId: fanId // Fan ID ni variantga qo'shamiz
                });
                await newOption.save();

                // Savolga variantni qo'shish
                currentQuestion.options.push(newOption._id); // Variantni savolga qo'shish
            }
        }

        if (!currentQuestion) {
            return res.status(400).json({
                message: "Yuklangan faylda hech qanday savol yoki variant topilmadi."
            });
        }

        await currentQuestion.save(); // Savolni yangilab saqlash

        res.status(200).json({ message: "Savollar va variantlar muvaffaqiyatli saqlandi!" });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Serverda xatolik yuz berdi!" });
    }
};
