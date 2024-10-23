const Question = require('../models/Questions'); // Savollar modelini import qilish
const Option = require('../models/Options'); // Variantlar modelini import qilish

exports.getQuestionsWithOptionsByFanId = async (req, res) => {
    const { fanId } = req.params; // URL dan fan ID ni olish

    try {
        // Foydalanuvchidan fan ID ga muvofiq savollarni olish
        const questions = await Question.find({ fanId }) // Fan ID ga muvofiq savollarni qidiring
            .populate({
                path: 'options', // Variantlarni populate qilish
                match: { fanId } // Faqat fanId ga muvofiq variantlarni olish
            });

        if (!questions.length) {
            return res.status(404).json({ message: "Savollar topilmadi!" });
        }

        // Savollarni va ularning variantlarini foydalanuvchiga qaytarish
        res.status(200).json({
            message: "Savollar muvaffaqiyatli olindi!",
            questions
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Serverda xatolik yuz berdi!" });
    }
};
