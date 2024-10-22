const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    optionText: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        default: false
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Option', optionSchema);
