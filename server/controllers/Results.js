const Result = require('../models/Result');
const User = require('../models/Auth'); // Assuming there's a User model

const getResultsByFanId = async (req, res) => {
    const { fanId } = req.params;

    try {
        const results = await Result.find({ fanId })
            .populate('userId', 'name') // Bu yerda userId'ni `name` bilan populat qilmoqda
            .exec();

        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'Hech qanday natijalar topilmadi.' });
        }

        const formattedResults = results.map(result => ({
            userName: result.userId ? result.userId.name : 'Noma' , // Foydalanuvchi ismini olish
            score: result.score,
            totalQuestions: result.totalQuestions,
            correctCount: result.correctCount,
            date: result.date
        }));

        res.status(200).json(formattedResults);

    } catch (error) {
        console.error('Error fetching results:', error);
        res.status(500).json({ message: 'Natijalarni olishda xato yuz berdi.' });
    }
};

module.exports = { getResultsByFanId };
