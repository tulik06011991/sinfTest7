const Result = require('../models/Result');
const User = require('../models/Auth'); // Assuming there's a User model

// Fetch exam results for a specific fan (subject) by fanId
const getResultsByFanId = async (req, res) => {
    const { fanId } = req.params;

    try {
        // Find results based on fanId and populate the userId to get the user's name
        const results = await Result.find({ fanId })
            .populate('userId', 'name') // Populate the userId field to get user's name
            .exec();

        // Check if results were found
        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'Hech qanday natijalar topilmadi.' });
        }

        // Format the response with relevant data
        const formattedResults = results.map(result => ({
            userName: result.userId.name,
            score: result.score,
            totalQuestions: result.totalQuestions,
            correctCount: result.correctCount,
            date: result.date
        }));

        // Return the formatted results
        res.status(200).json(formattedResults);

    } catch (error) {
        console.error('Error fetching results:', error);
        res.status(500).json({ message: 'Natijalarni olishda xato yuz berdi.' });
    }
};

module.exports = { getResultsByFanId };
