const User = require('../models/Auth');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Foydalanuvchini yaratish
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({
            message: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi!",
            userId: newUser._id
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Bu foydalanuvchi allaqachon ro'yxatdan o'tgan!" });
        }
        res.status(500).json({ message: "Serverda xatolik yuz berdi!" });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Foydalanuvchini topish
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Foydalanuvchi topilmadi!" });
        }

        // Parolni tekshirish
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Noto'g'ri parol!" });
        }

        // JWT yaratish
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: "Muvaffaqiyatli tizimga kirdingiz!",
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Serverda xatolik yuz berdi!" });
    }
};
