const mongoose = require('mongoose');

const fanSchema = new mongoose.Schema({
  fanNomi: { type: String, required: true, unique: true },
  adminNomi: { type: String, required: true },
  adminParoli: { type: String, required: true },
  adminEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Model yaratish
const Fan = mongoose.model('Fan', fanSchema);

module.exports = Fan;
