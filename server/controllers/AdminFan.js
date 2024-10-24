const mongoose = require('mongoose');
const Fan = require('../models/Subject');
const { v4: uuidv4 } = require('uuid'); // To'g'ri model yo'li

const createFan = async (req, res) => {
  const { fanNomi, adminNomi, adminEmail } = req.body;

  try {
    // Foydalanuvchi mavjudligini tekshirish
    const fanExists = await Fan.findOne({ fanNomi });
    if (fanExists) {
      return res.status(400).json({ error: "Bu fan allaqachon mavjud!" });
    }

    // Yangi fan yaratish
    const newFan = new Fan({
      fanNomi,
      adminNomi,
      adminEmail,
      fanId: uuidv4() // fanId ni to'g'ridan-to'g'ri o'rnatish
    });

    // Fan saqlash
    await newFan.save();

    res.status(201).json({ message: "Fan muvaffaqiyatli yaratildi!", fan: newFan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Xatolik yuz berdi, fanni yaratib bo'lmadi." });
  }
};








 // Fan modelini import qilish

// Barcha fanlarni olish controller'i
 const getAllFans = async (req, res) => {
    try {
        // Barcha fanlarni olish
        const fanlar = await Fan.find();

        // Agar fanlar bo'lmasa
        if (!fanlar.length) {
            return res.status(404).json({ message: 'Fanlar topilmadi!' });
        }

        // Muvaffaqiyatli javob
        res.status(200).json(fanlar);
    } catch (error) {
        // Xatolik yuz bersa
        res.status(500).json({ message: 'Serverda xatolik yuz berdi!', error });
    }
};



module.exports = { createFan, getAllFans };
