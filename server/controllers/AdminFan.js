const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Fan = require('../models/Subject'); // O'z Fan modelingizga yo'l ko'rsating

const createFan = async (req, res) => {
  const { fanNomi, adminNomi, adminParoli, adminEmail } = req.body;

  try {
    // Foydalanuvchi mavjudligini tekshirish
    const fanExists = await Fan.findOne({ fanNomi }); // fanNomi orqali tekshirish
    if (fanExists) {
      return res.status(400).json({ error: "Bu fan allaqachon mavjud!" });
    }

    // Parolni shifrlash
    const hashedPassword = await bcrypt.hash(adminParoli, 10);

    // Yangi fan yaratish
    const newFan = new Fan({
      fanNomi,
      adminNomi,
      adminParoli: hashedPassword, // shifrlangan parol
      adminEmail
      // fanId ni kiritmaslik, Mongoose avtomatik ravishda yaratadi
    });

    // Fan saqlash
    await newFan.save();

    res.status(201).json({ message: "Fan muvaffaqiyatli yaratildi!", fan: newFan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Xatolik yuz berdi, fanni yaratib bo'lmadi." });
  }
};

module.exports = { createFan };
