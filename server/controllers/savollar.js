const Question = require('../models/Questions');  // Question modelini import qilish
const Option = require('../models/Options');      // Option modelini import qilish

// Savollar va variantlarni olish controlleri
const getQuestionsByFanId = async (req, res) => {
    const { fanId } = req.params; // frontenddan yuborilgan fanId params orqali olinadi

    try {
        // Berilgan fanId ga mos savollarni options bilan birga olish
        const questions = await Question.find({ fanId })
            .populate({
                path: 'options',
                model: 'Option',
                select: 'optionText isCorrect', // Kerakli maydonlarni tanlash
            });

        // Agar savollar topilmasa, xatolik qaytarish
        if (!questions || questions.length === 0) {
            return res.status(404).json({ message: 'Savollar topilmadi' });
        }

        // Savollarni variantlari bilan birga qaytarish
        res.status(200).json(questions);
    } catch (error) {
        console.error('Xatolik:', error);
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' });
    }
};

module.exports = {
    getQuestionsByFanId,
};

