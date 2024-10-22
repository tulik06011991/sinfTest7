const Fan = require('../models/Fan');
const Question = require('../models/Question');
const Option = require('../models/Option');

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
                questionText: savol.questionText,
                options
            };
        }));

        res.status(200).json(questionsWithOptions);
    } catch (error) {
        res.status(500).json({ message: "Savollarni olishda xatolik yuz berdi!" });
    }
};
