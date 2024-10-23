const User = require('../models/Auth');

// Foydalanuvchi qo'shish
exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Foydalanuvchi yaratish
        const newUser = new User({ username, email, password });
        await newUser.save();
        
        res.status(201).json({ message: 'Foydalanuvchi yaratildi', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Foydalanuvchini yaratishda xatolik', error });
    }
};

// Barcha foydalanuvchilarni olish
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Foydalanuvchilarni olishda xatolik', error });
    }
};

// Foydalanuvchini ID bo'yicha olish
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Foydalanuvchini olishda xatolik', error });
    }
};

// Foydalanuvchini yangilash
exports.updateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Foydalanuvchini topish va yangilash
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
        }

        user.username = username || user.username;
        user.email = email || user.email;
        if (password) {
            user.password = password; // Bu yerda parolni xesh qilish avtomatik ravishda amalga oshiriladi
        }
        
        await user.save();
        res.status(200).json({ message: 'Foydalanuvchi yangilandi', user });
    } catch (error) {
        res.status(500).json({ message: 'Foydalanuvchini yangilashda xatolik', error });
    }
};

// Foydalanuvchini o'chirish
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
        }
        res.status(200).json({ message: 'Foydalanuvchi o\'chirildi' });
    } catch (error) {
        res.status(500).json({ message: 'Foydalanuvchini o\'chirishda xatolik', error });
    }
};
