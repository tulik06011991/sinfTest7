import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [questions, setQuestions] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fanId = localStorage.getItem('fanId');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const fetchQuestions = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:5000/api/questions/${fanId}`);
            setQuestions(response.data);
        } catch (err) {
            setError('Savollarni yuklashda xato.');
        }
        setLoading(false);
    };

    // Fan ID bo'yicha natijalarni olish
    const fetchResults = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:5000/api/results/${fanId}`); 
            console.log(response.data); // Natijalar strukturasini ko'rish
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
            await axios.delete(`http://localhost:5000/api/fan/${fanId}`);
            setQuestions([]);
            setError('Barcha savollar muvaffaqiyatli o\'chirildi.');
        } catch (err) {
            setError('Savollarni o\'chirishda xato.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                {Array.isArray(questions) && questions.map((question) => (
                                    <tr key={question._id}>
                                        <td className="py-2 px-4 border-b font-bold">{question.questionText}</td>
                                        <td className="py-2 px-4 border-b">
                                            {Array.isArray(question.options) && question.options.map((option) => (
                                                <span
                                                    key={option._id}
                                                    className={`font-bold ${option.isCorrect ? 'text-green-500' : 'text-gray-700'}`}
                                                >
                                                    {option.optionText}
                                                    {option !== question.options[question.options.length - 1] && ', '}
                                                </span>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

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
                                    <th className="py-2 px-4 border-b">Umumiy Savollar</th>
                                    <th className="py-2 px-4 border-b">To'g'ri Javoblar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(results) && results.map((result) => (
                                    <tr key={result._id}>
                                        <td className="py-2 px-4 border-b">{result.userName || 'Noma'}</td>
                                        <td className="py-2 px-4 border-b">{result.score || 0}</td>
                                        <td className="py-2 px-4 border-b">{result.totalQuestions || 0}</td>
                                        <td className="py-2 px-4 border-b">{result.correctAnswers || 0}</td>
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
