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
                const response = await axios.get("/api/fanlar");
                setFanlar(response.data);
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
            const response = await axios.get(`/api/savollar/${fanId}`);
            setSavollar(response.data);
        } catch (error) {
            console.error("Savollarni olishda xatolik yuz berdi.");
        }
    };

    // Javoblarni belgilash
    const handleAnswerChange = (savolId, variant) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [savolId]: variant,
        }));
    };

    // Javoblarni yuborish va natijani ko'rsatish
    const handleSubmit = async () => {
        try {
            const response = await axios.post("/api/tekshirJavoblar", {
                fanId: selectedFan,
                answers,
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
                    <option key={fan._id} value={fan.fanId}>
                        {fan.fanNomi}
                    </option>
                ))}
            </select>

            {savollar.length > 0 && (
                <div className="quiz-section">
                    <h2>Savollar</h2>
                    {savollar.map((savol) => (
                        <div key={savol._id}>
                            <h3>{savol.savol}</h3>
                            {savol.variants.map((variant, index) => (
                                <div key={index}>
                                    <input
                                        type="radio"
                                        name={`savol-${savol._id}`}
                                        value={variant}
                                        onChange={() => handleAnswerChange(savol._id, variant)}
                                    />
                                    {variant}
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
