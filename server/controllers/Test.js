const Fan = require('../models/Subject');
const Question = require('../models/Questions');
const Option = require('../models/Options');

// Fanlar ro'yxatini olish
exports.getFanlar = async (req, res) => {
    try {
        const fanlar = await Fan.find({});
        res.status(200).json(fanlar);
    } catch (error) {
        res.status(500).json({ message: "Fanlarni olishda xatolik yuz berdi!" });
    }
};

// Tanlangan fan bo'yicha savollarni va variantlarini olish
exports.getSavollarByFan = async (req, res) => {
    const { fanId } = req.params;

    try {
        // Fan bilan bog'liq savollarni olish
        const savollar = await Question.find({ fanId }).populate('fanId');

        // Har bir savolga oid variantlarni olish
        const questionsWithOptions = await Promise.all(savollar.map(async (savol) => {
            const options = await Option.find({ question: savol._id });
            return {
                questionId: savol._id,
                questionText: savol.questionText,
                options: options.map(option => ({
                    _id: option._id,
                    optionText: option.optionText,
                    isCorrect: option.isCorrect
                }))
            };
        }));

        res.status(200).json(questionsWithOptions);
    } catch (error) {
        res.status(500).json({ message: "Savollarni olishda xatolik yuz berdi!" });
    }
};

// Javoblarni tekshirish
exports.checkAnswers = async (req, res) => {
    const { answers } = req.body;
    console.log(answers);
    

    try {
        let correctCount = 0;
        const totalQuestions = answers.length;

        // Har bir savolga nisbatan foydalanuvchi javoblarini tekshirish
        for (const answer of answers) {
            const { questionId, selectedOption } = answer;

            // Savolga oid to'g'ri variantni topish
            const correctOption = await Option.findOne({ question: questionId, isCorrect: true });

            // Foydalanuvchi to'g'ri variantni tanlaganligini tekshirish
            if (correctOption && correctOption._id.toString() === selectedOption) {
                correctCount++;
            }
        }

        const score = (correctCount / totalQuestions) * 100;

        res.status(200).json({
            message: "Natijalar hisoblandi",
            correctCount,
            totalQuestions,
            score
        });
    } catch (error) {
        res.status(500).json({ message: "Javoblarni tekshirishda xatolik yuz berdi!" });
    }
};
