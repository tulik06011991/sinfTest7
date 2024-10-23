const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    fanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fan', // Fanga bog'lash
        required: true
    },
    options: [{ // Variantlar bilan bog'lash uchun options maydoni qo'shildi
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option' // Variantlar modeliga bog'lash
    }]
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
