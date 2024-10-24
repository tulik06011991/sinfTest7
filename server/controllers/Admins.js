const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

exports.createAdmin = async (req, res) => {
    const { name, email, password, role, subject } = req.body;

    try {
        // Admin mavjudligini tekshirish
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin allaqachon mavjud!' });
        }

        // Yangi admin yaratish
        const newAdmin = new Admin({
            name,
            email,
            password,
            role,
            subject
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin muvaffaqiyatli yaratildi!', admin: newAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi!', error });
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi!', error });
    }
};

exports.getAdminById = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin topilmadi!' });
        }

        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi!', error });
    }
};

exports.updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role, subject } = req.body;

    try {
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin topilmadi!' });
        }

        // Yangilash
        admin.name = name || admin.name;
        admin.email = email || admin.email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(password, salt);
        }
        admin.role = role || admin.role;
        admin.subject = subject || admin.subject;

        await admin.save();
        res.status(200).json({ message: 'Admin muvaffaqiyatli yangilandi!', admin });
    } catch (error) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi!', error });
    }
};

exports.deleteAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        // ID orqali adminni topib va o'chirish
        const admin = await Admin.findByIdAndDelete(id);

        // Agar admin topilmasa
        if (!admin) {
            return res.status(404).json({ message: 'Admin topilmadi!' });
        }

        // Admin muvaffaqiyatli o'chirildi
        res.status(200).json({ message: 'Admin muvaffaqiyatli o\'chirildi!' });
    } catch (error) {
        // Serverda xatolik yuz berganda
        res.status(500).json({ message: 'Serverda xatolik yuz berdi!', error });
    }
};

