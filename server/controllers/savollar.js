const Question = require('../models/Questions');  // Question modelini import qilish
const Option = require('../models/Options');      // Option modelini import qilish

// Savollar va variantlarni olish controlleri
const getQuestionsByFanId = async (req, res) => {
    const { fanId } = req.params; // frontenddan yuborilgan fanId params orqali olinadi
console.log(fanId);

    try {
        // fanId ning null yoki undefined bo'lishini tekshirish
        if (!fanId || fanId =='null') {
            return res.status(400).json({ message: 'fanId qiymati noto\'g\'ri yoki mavjud emas' });
        }

        // Berilgan fanId ga mos savollarni olish
        const questions = await Question.find({ fanId });

        if (!questions || questions.length === 0) {
            return res.status(404).json({ message: 'Savollar topilmadi' });
        }

        // Har bir savolga mos variantlarni yuklash
        const questionsWithOptions = await Promise.all(
            questions.map(async (question) => {
                const options = await Option.find({ question: question._id });  // Har bir savolga mos variantlarni topish
                return { ...question.toObject(), options }; // Savolni options bilan birga qaytarish
            })
        );

        // Savollarni variantlari bilan birga qaytarish
        res.status(200).json(questionsWithOptions);
    } catch (error) {
        console.error('Xatolik:', error);
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' });
    }
};

module.exports = {
    getQuestionsByFanId,
};
