const { v4: uuidv4 } = require('uuid'); // uuid kutubxonasini import qilish
const Fan = require('../models/fanModel');
const bcrypt = require('bcrypt');

// Fan yaratish controller
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
      fanId: uuidv4(), // avtomatik yaratilgan fanId
      fanNomi,
      adminNomi,
      adminParoli: hashedPassword, // shifrlangan parol
      adminEmail
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
