import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const userData = { username, email, password };
            const response = await axios.post('http://localhost:5000/auth/register', userData);
            console.log(response.data); // Ro'yxatdan o'tgan foydalanuvchi ma'lumotlarini ko'rish
            // Ro'yxatdan o'tgandan keyin foydalanuvchini yo'naltirish mumkin
        } catch (error) {
            setError(error.response ? error.response.data.message : "Server xatosi!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Ro'yxatdan o'tish</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="username">Foydalanuvchi nomi</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="password">Parol</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Ro'yxatdan o'tish
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Hisobingiz bormi?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">Tizimga kiring</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
