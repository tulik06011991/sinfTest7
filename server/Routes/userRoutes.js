const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

// Yangi foydalanuvchi qo'shish
router.post('/', userController.createUser);

// Barcha foydalanuvchilarni olish
router.get('/', userController.getAllUsers);

// Foydalanuvchini ID bo'yicha olish
router.get('/:id', userController.getUserById);

// Foydalanuvchini yangilash
router.put('/:id', userController.updateUser);

// Foydalanuvchini o'chirish
router.delete('/:id', userController.deleteUser);

module.exports = router;
