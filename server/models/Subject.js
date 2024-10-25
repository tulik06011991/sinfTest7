const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // UUID kutubxonasi

const fanSchema = new mongoose.Schema({
  fanId: { type: String, default: uuidv4, unique: true }, // fanId unikal va UUID bilan avtomatik generatsiya qilinadi
  fanNomi: { type: String, required: true, unique: true },
  adminNomi: { type: String, required: true },
  adminEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Fan = mongoose.model('Fan', fanSchema);

module.exports = Fan;
