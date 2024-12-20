const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const quizRoutes = require('./Routes/faylYuklash');
const adminFan = require('./Routes/AdminFan')
const auth = require('./Routes/Auth')
const savollar = require('./Routes/savollar')
const admins = require('./Routes/Admins')
const Test = require('./Routes/Test')
const userRoute = require('./Routes/userRoutes');
const savolVariantDelete= require('./Routes/savolvariantDelete');
const results = require('./Routes/Results')


// Konfiguratsiyani yuklash
dotenv.config();

// Express ilovasini yaratish
const app = express();
app.timeout = 300000;

// Middleware
const corsOptions = {
    origin: '*', // Frontend ilovangiz joylashgan manzil
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Ruxsat etilgan HTTP metodlar
    allowedHeaders: ['Content-Type', 'Authorization'], // Ruxsat etilgan headerlar
    credentials: true, // Cookie'lar bilan ishlash uchun
  };
  
  // CORS middleware'ni ishlatish
  app.use(cors(corsOptions));
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
app.use('/auth', auth); 
app.use('/api', savollar)
app.use('/admin', admins)
app.use("/test", Test)
app.use('/users', userRoute);
app.use('/api', savolVariantDelete);
app.use('/api', results)

// 404 sahifa topilmagan holat
app.use((req, res, next) => {
    res.status(404).json({ message: 'Sahifa topilmadi' });
});

// Serverni ishga tushirish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server ${PORT}-portda ishlamoqda`);
});

