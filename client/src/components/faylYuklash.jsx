import React, { useState } from 'react';
import axios from 'axios';
import "../App.css"

const UploadQuiz = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Iltimos, faylni tanlang.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/quiz/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Fayl muvaffaqiyatli yuklandi', response.data);
      alert('Fayl muvaffaqiyatli yuklandi!');
    } catch (error) {
      console.error('Fayl yuklashda xatolik:', error);
      alert('Fayl yuklashda xatolik yuz berdi.');
    }
  };

  return (
    <div className="container mx-auto my-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Word fayl yuklash:</label>
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            accept=".doc,.docx"
            required
          />
        </div>

        <button 
          type="submit" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Yuklash
        </button>
      </form>
    </div>
  );
};

export default UploadQuiz;
