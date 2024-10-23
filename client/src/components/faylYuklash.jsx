import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FileUpload = () => {
    const [fanId, setFanId] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [fans, setFans] = useState([]); // Fanlar ro'yxati
    const navigate = useNavigate();

    useEffect(() => {
        // Local storage'da tokenni tekshirish
        const token = localStorage.getItem('token');

        // Agar token mavjud bo'lmasa, login sahifasiga yo'naltirish
        if (!token) {
            navigate('/login'); // Login sahifasining yo'li
        } else {
            // Fanlar ro'yxatini olish
            const fetchFans = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/test/fanlar'); // Fanlar olish uchun endpoint
                    setFans(response.data);
                } catch (error) {
                    console.error('Fanlarni olishda xato:', error);
                }
            };

            fetchFans(); // Fanlarni yuklash
        }
    }, [navigate]);

    // Fayl tanlanishi
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Formani yuborish
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fanId || !file) {
            setMessage('Iltimos, fan ID va faylni kiriting');
            return;
        }

        // FormData yaratish
        const formData = new FormData();
        formData.append('fanId', fanId);
        formData.append('file', file);

        try {
            // POST so'rovi orqali faylni yuklash
            const res = await axios.post('http://localhost:5000/api/quiz/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage('Fayl muvaffaqiyatli yuklandi!');
        } catch (err) {
            console.error(err);
            setMessage('Faylni yuklashda xatolik yuz berdi!');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-6">Fan ID va Fayl Yuklash</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="fanId" className="block text-sm font-medium text-gray-700">Fan:</label>
                    <select
                        id="fanId"
                        value={fanId}
                        onChange={(e) => setFanId(e.target.value)}
                        required
                        className="border border-gray-300 p-2 rounded w-full mt-1"
                    >
                        <option value="" disabled>Select a fan</option>
                        {fans.map((fan) => (
                            <option key={fan.id} value={fan.id}> {fan.fanNomi}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="file" className="block text-sm font-medium text-gray-700">Fayl yuklang:</label>
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        required
                        className="border border-gray-300 p-2 rounded w-full mt-1"
                    />
                </div>

                <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200 w-full">
                    Yuklash
                </button>
            </form>

            {message && <p className="text-center text-green-500 mt-4">{message}</p>}
        </div>
    );
};

export default FileUpload;
