const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Admin model schema
const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'superadmin'], // Rol turi ko'rsatilgan
        default: 'Admin'
    },
    subject: {
        type: String, // Admin uchun qo'shimcha maydon (masalan, "sayt")
        required: true
    }
});

// Parolni tekshirish uchun comparePassword funksiyasi
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Foydalanuvchini saqlashdan oldin parolni hash qilish
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
