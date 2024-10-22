const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const quizRoutes = require('./Routes/faylYuklash');
const adminFan = require('./Routes/AdminFan')
const auth = require('./Routes/Auth')

// Konfiguratsiyani yuklash
dotenv.config();

// Express ilovasini yaratish
const app = express();

// Middleware
app.use(cors()); // CORS uchun
app.use(express.json()); // JSON formatdagi ma'lumotlarni olish uchun
app.use(express.urlencoded({ extended: true })); // URL-encoded ma'lumotlarni olish uchun

// MongoDB bilan bog'lanish
mongoose.connect(process.env.MONGO_URL,
   
)
    .then(() => console.log('MongoDB bilan bog‘landi'))
    .catch((err) => console.error('MongoDB bilan bog‘lanishda xatolik:', err));

// Marshrutlar
app.use('/api/quiz', quizRoutes);
app.use('/api/fan', adminFan);
app.use('/auth', auth); // Quiz uchun marshrutlar

// 404 sahifa topilmagan holat
app.use((req, res, next) => {
    res.status(404).json({ message: 'Sahifa topilmadi' });
});

// Serverni ishga tushirish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server ${PORT}-portda ishlamoqda`);
});

