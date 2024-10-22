const User = require('../models/Auth');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Admin modeli
  // User modeli
const Fan = require('../models/Subject');     // Fan modeli

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
        let user = null;
        let role = '';
        let fanId = null;

        // 1. Admin modelidan izlash
        let admin = await Admin.findOne({ email });
        if (admin) {
            user = admin;  // Admin topilgan bo'lsa, user sifatida qaytariladi
            role = 'admin';

            // 2. Admin bilan bog'liq fanni topish
            const fan = await Fan.findOne({ adminEmail: email });
            if (fan) {
                fanId = fan.fanId;  // Adminning fanId si olindi
            }
        } else {
            // 3. Agar admin topilmasa, User modelidan izlash
            let foundUser = await User.findOne({ email });
            if (foundUser) {
                user = foundUser;  // Foydalanuvchi topilsa, user sifatida qaytariladi
                role = 'user';
            }
        }

        // 4. Agar user topilmasa, xatolik qaytarish
        if (!user) {
            return res.status(400).json({ message: "Foydalanuvchi topilmadi!" });
        }

        // 5. Parolni tekshirish
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Noto'g'ri parol!" });
        }

        // 6. JWT yaratish
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // 7. Rolga ko'ra yo'naltirish
        let redirectUrl = '';

        // Superadmin emailini tekshirish
        if (email === 'Abdumuhammad@gmail.com') {
            redirectUrl = '/superadmin/dashboard';  // Superadmin yo'naltiriladi
        } else if (role === 'admin') {
            redirectUrl = '/admin/dashboard';       // Admin bo'lsa, admin dashboard
        } else {
            redirectUrl = '/savolJavoblar';         // Oddiy foydalanuvchi bo'lsa
        }

        // 8. Javob qaytarish
        res.status(200).json({
            message: "Muvaffaqiyatli tizimga kirdingiz!",
            token,
            redirectUrl,  // Yo'naltirish manzili
            fanId         // Admin bo'lsa, fanId ham qaytariladi
        });

    } catch (error) {
        res.status(500).json({ message: "Serverda xatolik yuz berdi!" });
    }
};
