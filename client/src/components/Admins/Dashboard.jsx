import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [questions, setQuestions] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchQuestions = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:5000/api/questions'); // Savollarni olish uchun endpoint
            setQuestions(response.data);
        } catch (err) {
            setError('Savollarni yuklashda xato.');
        }
        setLoading(false);
    };

    const fetchResults = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:5000/api/results'); // Natijalarni olish uchun endpoint
            setResults(response.data);
        } catch (err) {
            setError('Natijalarni yuklashda xato.');
        }
        setLoading(false);
    };

    const handleDeleteAllQuestions = async () => {
        setLoading(true);
        setError('');
        try {
            await axios.delete('http://localhost:5000/api/questions'); // Savollarni o'chirish uchun endpoint
            setQuestions([]); // Savollarni o'chirgandan so'ng, state'ni yangilash
            setError('Barcha savollar muvaffaqiyatli o\'chirildi.'); // Xabar berish
        } catch (err) {
            setError('Savollarni o\'chirishda xato.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Savollar va variantlar kartasi */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Savollar va Variantlar</h3>
                    <button
                        onClick={fetchQuestions}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Barcha Savollarni Ko'rish
                    </button>
                    <button
                        onClick={handleDeleteAllQuestions}
                        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                    >
                        Barcha Savollarni O'chirish
                    </button>
                    {loading && <p className="text-center">Yuklanmoqda...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Savol</th>
                                    <th className="py-2 px-4 border-b">Variantlar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questions.map((question) => (
                                    <tr key={question.id}>
                                        <td className="py-2 px-4 border-b">{question.question}</td>
                                        <td className="py-2 px-4 border-b">{question.options.join(', ')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Foydalanuvchilar natijalari kartasi */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Foydalanuvchilar Natijalari</h3>
                    <button
                        onClick={fetchResults}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Natijalarni Ko'rish
                    </button>
                    {loading && <p className="text-center">Yuklanmoqda...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Foydalanuvchi</th>
                                    <th className="py-2 px-4 border-b">Natija</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((result) => (
                                    <tr key={result.id}>
                                        <td className="py-2 px-4 border-b">{result.username}</td>
                                        <td className="py-2 px-4 border-b">{result.score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
