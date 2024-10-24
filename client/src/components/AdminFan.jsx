import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateFan = () => {
  const [fanNomi, setFanNomi] = useState('');
  const [adminNomi, setAdminNomi] = useState('');
  const [adminParoli, setAdminParoli] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [fanlar, setFanlar] = useState([]); // Fan va admin ma'lumotlari uchun state

  const navigate = useNavigate();

  useEffect(() => {
    // Local storage'da tokenni tekshirish
    const token = localStorage.getItem('token');

    // Agar token mavjud bo'lmasa, login sahifasiga yo'naltirish
    if (!token) {
      navigate('/login'); // Login sahifasining yo'li
    } else {
      // Token mavjud bo'lsa, barcha fanlarni olish
      fetchFanlar();
    }
  }, [navigate]);

  // Barcha fanlarni olish funksiyasi
  const fetchFanlar = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/fan/adminFan');
      console.log(response.data);
      
      setFanlar(response.data.fanlar); // Fanlar va adminlarni state'ga o'rnatish
    } catch (error) {
      console.error('Fanlar va adminlarni olishda xatolik:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ma'lumotlarni tekshirish
    if (!fanNomi || !adminNomi || !adminParoli || !adminEmail) {
      alert("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    const fanData = {
      fanNomi,
      adminNomi,
      adminParoli,
      adminEmail,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/fan/create', fanData);
      alert(response.data.message);
      // Formani tozalash
      setFanNomi('');
      setAdminNomi('');
      setAdminParoli('');
      setAdminEmail('');
      // Yangi fan yaratildi, fanlar ro'yxatini yangilash
      fetchFanlar();
    } catch (error) {
      console.error('Xatolik:', error);
      alert('Fanni yaratishda xatolik yuz berdi.');
    }
  };

  return (
    <div className="container mx-auto my-10 p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Fan Yaratish</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Fan Nomi:</label>
          <input 
            type="text" 
            value={fanNomi} 
            onChange={(e) => setFanNomi(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Admin Nomi:</label>
          <input 
            type="text" 
            value={adminNomi} 
            onChange={(e) => setAdminNomi(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Admin Paroli:</label>
          <input 
            type="password" 
            value={adminParoli} 
            onChange={(e) => setAdminParoli(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Admin Email:</label>
          <input 
            type="email" 
            value={adminEmail} 
            onChange={(e) => setAdminEmail(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            required
          />
        </div>

        <button 
          type="submit" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 w-full"
        >
          Yaratish
        </button>
      </form>

      {/* Fan va admin ma'lumotlarini ko'rsatish */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Fanlar va Adminlar Ro'yxati</h3>
        {fanlar && fanlar.length > 0 ? (
  <ul className="space-y-4">
    {fanlar.map((fan) => (
      <li key={fan._id} className="p-4 border border-gray-300 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold">Fan: {fan.fanNomi}</h4>
        <p>Admin Nomi: {fan.adminNomi}</p>
        <p>Admin Email: {fan.adminEmail}</p>
      </li>
    ))}
  </ul>
) : (
  <p>Hozircha fanlar mavjud emas.</p>
)}

      </div>
    </div>
  );
};

export default CreateFan;
