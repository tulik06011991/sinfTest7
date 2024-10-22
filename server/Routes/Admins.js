const express = require('express');
const router = express.Router();
const { createAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin } = require('../controllers/Admins');

// Admin CRUD operatsiyalari
router.post('/admin', createAdmin);         // Yangi admin yaratish
router.get('/admins', getAllAdmins);        // Barcha adminlarni olish
router.get('/admin/:id', getAdminById);     // Bitta adminni ID orqali olish
router.put('/admin/:id', updateAdmin);      // Adminni yangilash
router.delete('/admin/:id', deleteAdmin);   // Adminni o'chirish

module.exports = router;
