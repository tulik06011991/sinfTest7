import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadQuiz = () => {
    const [file, setFile] = useState(null);
    const [subjectId, setSubjectId] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Backenddan fanlarni olish
        const fetchSubjects = async () => {
            try {
                const response = await axios.get('/api/subjects'); // Backend API orqali fanlarni olish
                setSubjects(response.data);
            } catch (error) {
                console.error('Fanlarni olishda xatolik:', error);
            }
        };

        fetchSubjects();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubjectChange = (e) => {
        setSubjectId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !subjectId) {
            setMessage('Iltimos, fan va Word faylini tanlang.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('subjectId', subjectId);

        try {
            setUploading(true);
            setMessage('');

            const response = await axios.post('/api/quiz/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage('Fayl muvaffaqiyatli yuklandi!');
        } catch (error) {
            console.error('Fayl yuklashda xatolik:', error);
            setMessage('Fayl yuklashda xatolik yuz berdi.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Quiz Fayl Yuklash</h2>

                {message && (
                    <div className="mb-4 text-center text-white bg-green-500 p-2 rounded-lg">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                            Fan tanlang
                        </label>
                        <select
                            id="subject"
                            className="block w-full border border-gray-300 rounded-lg py-2 px-3 bg-white text-gray-700 focus:outline-none focus:border-indigo-500"
                            value={subjectId}
                            onChange={handleSubjectChange}
                        >
                            <option value="">Fan tanlang</option>
                            {subjects.map((subject) => (
                                <option key={subject._id} value={subject._id}>
                                    {subject.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="file" className="block text-gray-700 font-medium mb-2">
                            Word fayl yuklang
                        </label>
                        <input
                            type="file"
                            id="file"
                            className="block w-full border border-gray-300 rounded-lg py-2 px-3 bg-white text-gray-700 focus:outline-none focus:border-indigo-500"
                            onChange={handleFileChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={uploading}
                    >
                        {uploading ? 'Yuklanmoqda...' : 'Yuklash'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadQuiz;
