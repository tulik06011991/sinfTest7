const Question = require('../models/Questions'); // Savol modelini import qilish
const Option = require('../models/Options'); // Variant modelini import qilish

// fanId bo'yicha savollarni o'chirish
const deleteQuestionsByFanId = async (req, res) => {
    const { fanId } = req.params; // URL parametrlardan fanId ni olish
    try {
        // 1. Savollarni topamiz
        const questions = await Question.find({ fanId });

        // 2. Agar savollar mavjud bo'lsa, variantlarni o'chiramiz
        if (questions.length > 0) {
            await Option.deleteMany({ question: { $in: questions.map(q => q._id) } }); // Variantlarni o'chirish

            // 3. Savollarni o'chiramiz
            await Question.deleteMany({ fanId });

            return res.status(200).json({ message: 'Savollar va ularning variantlari muvaffaqiyatli o\'chirildi.' });
        } else {
            return res.status(404).json({ message: 'Savollar topilmadi.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Serverda xato yuz berdi.' });
    }
};

module.exports = {
    deleteQuestionsByFanId,
};
