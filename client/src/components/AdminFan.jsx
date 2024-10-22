import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateFan = () => {
  const [fanNomi, setFanNomi] = useState('');
  const [adminNomi, setAdminNomi] = useState('');
  const [adminParoli, setAdminParoli] = useState('');
  const [adminEmail, setAdminEmail] = useState('');


  const navigate= useNavigate()
    useEffect(() => {
        // Local storage'da tokenni tekshirish
        const token = localStorage.getItem('token');

        // Agar token mavjud bo'lmasa, login sahifasiga yo'naltirish
        if (!token) {
            navigate('/login'); // Login sahifasining yo'li
        }
    }, [navigate]);

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
      adminEmail
    };

    try {
      const response = await axios.post('http://localhost:5000/api/fan/create', fanData);
      alert(response.data.message);
      // Formani tozalash
      setFanNomi('');
      setAdminNomi('');
      setAdminParoli('');
      setAdminEmail('');
    } catch (error) {
      console.error('Xatolik:', error);
      alert('Fanni yaratishda xatolik yuz berdi.');
    }
  };

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6">Fan Yaratish</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Fan Nomi:</label>
          <input 
            type="text" 
            value={fanNomi} 
            onChange={(e) => setFanNomi(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Admin Nomi:</label>
          <input 
            type="text" 
            value={adminNomi} 
            onChange={(e) => setAdminNomi(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Admin Paroli:</label>
          <input 
            type="password" 
            value={adminParoli} 
            onChange={(e) => setAdminParoli(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Admin Email:</label>
          <input 
            type="email" 
            value={adminEmail} 
            onChange={(e) => setAdminEmail(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <button 
          type="submit" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Yaratish
        </button>
      </form>
    </div>
  );
};

export default CreateFan;
