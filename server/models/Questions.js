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
   
});

module.exports = mongoose.model('Question', QuestionSchema);
