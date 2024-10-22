const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    isCorrect: {
        type: Boolean,
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }
});

module.exports = mongoose.model('Option', OptionSchema);
