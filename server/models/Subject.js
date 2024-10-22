const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fanSchema = new Schema({
  fanId: {
    type: String,
    required: true,
    unique: true
  },
  fanNomi: {
    type: String,
    required: true
  },
  adminNomi: {
    type: String,
    required: true
  },
  adminParoli: {
    type: String,
    required: true
  },
  adminEmail: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Fan = mongoose.model('Fan', fanSchema);
module.exports = Fan;
