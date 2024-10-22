import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QuizComponent = () => {
    const [fanlar, setFanlar] = useState([]);
    const [selectedFan, setSelectedFan] = useState("");
    const [savollar, setSavollar] = useState([]);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const navigate= useNavigate()

    // Fanlar ro'yxatini olish
    useEffect(() => {
        const getFanlar = async () => {
            try {
                const response = await axios.get("http://localhost:5000/test/fanlar");
                setFanlar(response.data);
            } catch (error) {
                console.error("Fanlarni olishda xatolik yuz berdi.");
            }
        };
        getFanlar();
    }, []);
    useEffect(() => {
        // Local storage'da tokenni tekshirish
        const token = localStorage.getItem('token');

        // Agar token mavjud bo'lmasa, login sahifasiga yo'naltirish
        if (!token) {
            navigate('/login'); // Login sahifasining yo'li
        }
    }, [navigate]);

    // Tanlangan fan bo'yicha savollarni olish
    const handleFanChange = async (fanId) => {
        setSelectedFan(fanId);
        try {
            const response = await axios.get(`http://localhost:5000/test/savollar/${fanId}`);
            setSavollar(response.data);
            setAnswers({}); // Yangi fan tanlanganda javoblarni tozalash
        } catch (error) {
            console.error("Savollarni olishda xatolik yuz berdi.");
        }
    };

    // Javoblarni belgilash
    const handleAnswerChange = (questionId, optionId) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: optionId,
        }));
    };

    // Javoblarni yuborish va natijani ko'rsatish
    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:5000/test/tekshirJavoblar", {
                answers: Object.keys(answers).map((questionId) => ({
                    questionId,
                    selectedOption: answers[questionId],
                })),
            });
            setResult(response.data);
        } catch (error) {
            console.error("Javoblarni tekshirishda xatolik yuz berdi.");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-center mb-8">Fanlarni tanlang</h1>
            <div className="mb-6 text-center">
                <select
                    className="p-2 border border-gray-300 rounded-md w-64"
                    onChange={(e) => handleFanChange(e.target.value)}
                >
                    <option value="">Fan tanlang</option>
                    {fanlar.map((fan) => (
                        <option key={fan._id} value={fan._id}>
                            {fan.fanNomi}
                        </option>
                    ))}
                </select>
            </div>

            {savollar.length > 0 && (
                <div className="quiz-section">
                    <h2 className="text-xl font-semibold mb-4">Savollar</h2>
                    {savollar.map((savol) => (
                        <div key={savol.questionId} className="mb-6">
                            <h3 className="text-lg font-medium mb-2">{savol.questionText}</h3>
                            {/* Har bir savol uchun variantlarni ko'rsatamiz */}
                            {savol.options.map((option) => (
                                <div key={option._id} className="ml-4 mb-2">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name={`savol-${savol.questionId}`} // Har bir savol uchun alohida nom
                                            value={option._id}
                                            checked={answers[savol.questionId] === option._id} // Tanlangan variantni belgilash
                                            onChange={() => handleAnswerChange(savol.questionId, option._id)}
                                            className="form-radio"
                                        />
                                        <span>{option.optionText}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className="text-center">
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition"
                        >
                            Javoblarni yuborish
                        </button>
                    </div>
                </div>
            )}

            {result && (
                <div className="result-section mt-8 text-center">
                    <h2 className="text-xl font-bold">Natijalar</h2>
                    <p className="mt-4">
                        To'g'ri javoblar: {result.correctCount}/{result.totalQuestions}
                    </p>
                    <p className="mt-2">Umumiy ball: {result.score}%</p>
                </div>
            )}
        </div>
    );
};

export default QuizComponent;
