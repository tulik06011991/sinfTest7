import React, { useEffect, useState } from "react";
import axios from "axios";

const QuizComponent = () => {
    const [fanlar, setFanlar] = useState([]);
    const [selectedFan, setSelectedFan] = useState("");
    const [savollar, setSavollar] = useState([]);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    // Fanlar ro'yxatini olish
    useEffect(() => {
        const getFanlar = async () => {
            try {
                const response = await axios.get("http://localhost:5000/test/fanlar");
                setFanlar(response.data);
                console.log(response.data)
                
            } catch (error) {
                console.error("Fanlarni olishda xatolik yuz berdi.");
            }
        };
        getFanlar();
    }, []);

    // Tanlangan fan bo'yicha savollarni olish
    const handleFanChange = async (fanId) => {
        setSelectedFan(fanId);
        try {
            const response = await axios.get(`http://localhost:5000/test/savollar/${fanId}`);
           
            setSavollar(response.data);
        } catch (error) {
            console.error("Savollarni olishda xatolik yuz berdi.");
        }
    };
    console.log(savollar)
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
                answers: Object.keys(answers).map(questionId => ({
                    questionId,
                    selectedOption: answers[questionId]
                }))
            });
            setResult(response.data);
        } catch (error) {
            console.error("Javoblarni tekshirishda xatolik yuz berdi.");
        }
    };

    return (
        <div className="container">
            <h1>Fanlarni tanlang</h1>
            <select onChange={(e) => handleFanChange(e.target.value)}>
                <option value="">Fan tanlang</option>
                {fanlar.map((fan) => (
                    <option key={fan._id} value={fan._id}>
                        {fan.fanNomi}
                    </option>
                ))}
            </select>

            {savollar.length > 0 && (
    <div className="quiz-section">
        <h2>Savollar</h2>
        {savollar.map((savol) => (
            <div key={savol.questionText}>
                <h3>{savol.questionText}</h3>
                {savol.options.map((option) => (
                    <div key={option._id}>
                        <input
                            type="radio"
                            name={`savol-${savol._id}`}
                            value={option._id}
                            onChange={() => handleAnswerChange(savol._id, option._id)}
                        />
                        {/* Ichki obyekt bor-yo'qligini tekshirish */}
                        {option.options.optionText }
                    </div>
                ))}
            </div>
        ))}
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition">
            Javoblarni yuborish
        </button>
    </div>
)}


            {result && (
                <div className="result-section">
                    <h2>Natijalar</h2>
                    <p>To'g'ri javoblar: {result.correctCount}/{result.totalQuestions}</p>
                    <p>Umumiy ball: {result.score}%</p>
                </div>
            )}
        </div>
    );
};

export default QuizComponent;
