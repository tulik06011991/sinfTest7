const Fan = require('../models/Subject');
const Question = require('../models/Questions');
const Option = require('../models/Options');
const Result = require('../models/Result');

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
// Tasodifiy aralashtiruvchi funksiya
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

exports.getSavollarByFan = async (req, res) => {
    const { fanId } = req.params;

    try {
        // Fan bilan bog'liq savollarni olish
        let savollar = await Question.find({ fanId }).populate('fanId');

        // Har bir savolga oid variantlarni olish va aralashtirish
        const questionsWithOptions = await Promise.all(savollar.map(async (savol) => {
            let options = await Option.find({ question: savol._id });
            options = shuffleArray(options); // Variantlarni aralashtirish

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

        // Savollarning tartibini ham aralashtirish
        const shuffledQuestions = shuffleArray(questionsWithOptions);

        res.status(200).json(shuffledQuestions);
    } catch (error) {
        res.status(500).json({ message: "Savollarni olishda xatolik yuz berdi!" });
    }
};




exports.checkAnswers = async (req, res) => {
    const { answers, fanId, userId } = req.body; // Foydalanuvchi va fan ID olamiz
    // console.log(answers, fanId, userId);

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

        const score = (correctCount / totalQuestions) * 100; // Foydalanuvchining foiz ballini hisoblaymiz

        // Natijani saqlash
        const newResult = new Result({
            fanId,           // Fanning ID si
            userId,          // Foydalanuvchining ID si
            correctCount,    // To'g'ri javoblar soni
            totalQuestions,  // Umumiy savollar soni
            score            // Hisoblangan foiz natija
        });

        await newResult.save(); // Natijani bazaga saqlaymiz

        // Foydalanuvchiga natijani qaytaramiz
        res.status(200).json({
            message: "Natijalar hisoblandi va saqlandi",
            correctCount,
            totalQuestions,
            score
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Javoblarni tekshirishda xatolik yuz berdi!" });
    }
};

