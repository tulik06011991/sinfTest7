import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loader holatini qo'shish
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login'); // Login sahifasining yo'li
        }
    }, [navigate]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fanId = localStorage.getItem('fanId'); // localStorage dan fanId ni olish

        if (!fanId || !file) {
            setMessage('Iltimos, fan ID va faylni kiriting');
            return;
        }

        const formData = new FormData();
        formData.append('fanId', fanId); // fanId ni localStorage dan olingan qiymat bilan to'ldirish
        formData.append('file', file);

        setLoading(true); // Yuklashni boshlanganda loading holatini yoqing

        try {
            const res = await axios.post('http://localhost:5000/api/quiz/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Fayl muvaffaqiyatli yuklandi!');
        } catch (err) {
            console.error(err);
            setMessage('Faylni yuklashda xatolik yuz berdi!');
        } finally {
            setLoading(false); // Yuklash tugagandan so'ng loading holatini o'chiring
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-6">Fayl Yuklash</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
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

                <button 
                    type="submit" 
                    className={`bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading} // Yuklanayotgan paytda tugmani o'chirish
                >
                    {loading ? 'Yuklanmoqda...' : 'Yuklash'} {/* Yuklanayotgan paytda matnni o'zgartirish */}
                </button>
            </form>

            {message && <p className="text-center text-green-500 mt-4">{message}</p>}
        </div>
    );
};

export default FileUpload;
