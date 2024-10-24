const Result = require('../models/Result');
const User = require('../models/Auth'); // Assuming there's a User model



// Fan ID orqali natijalarni olish
const getResultsByFanId = async (req, res) => {
    const { fanId } = req.params;

    try {
        // fanId bo'yicha natijalarni topish
        const results = await Result.find({ fanId })
            .populate('userId', 'username') // userId bo'yicha populat qilish, faqat 'name' maydonini olish
            .exec();

        // Natijalar mavjudligini tekshirish
        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'Hech qanday natijalar topilmadi.' });
        }

        // Natijalarni formatlash
        const formattedResults = results.map(result => ({
            userId: result.userId, // Foydalanuvchi ismini olish
            userName: result.userId ? result.userId.username : 'Noma',
            correctCount: result.correctCount,
            totalQuestions: result.totalQuestions,
            score: result.score,
            date: result.date
        }));

        // Natijalarni qaytarish
        res.status(200).json(formattedResults);
        
    } catch (error) {
        console.error('Natijalarni olishda xato:', error);
        res.status(500).json({ message: 'Natijalarni olishda xato yuz berdi.' });
    }
};



// User ID orqali natijalarni o'chirish
const deleteUserResults = async (req, res) => {
    try {
        const {userId} = req.params;
        console.log(userId);
        

        // Foydalanuvchiga tegishli natijalarni topib o'chirish
        const deletedResults = await Result.deleteMany({ userId });

        if (deletedResults.deletedCount === 0) {
            return res.status(404).json({ message: 'Ushbu foydalanuvchining natijalari topilmadi.' });
        }

        return res.status(200).json({ message: 'Foydalanuvchining barcha natijalari muvaffaqiyatli o\'chirildi.' });
    } catch (error) {
        console.error('Natijalarni o\'chirishda xatolik:', error);
        return res.status(500).json({ message: 'Natijalarni o\'chirishda server xatosi yuz berdi.' });
    }
};




module.exports = { getResultsByFanId, deleteUserResults };
