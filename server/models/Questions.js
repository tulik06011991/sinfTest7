const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option'
    }],
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    }
});

module.exports = mongoose.model('Question', QuestionSchema);
