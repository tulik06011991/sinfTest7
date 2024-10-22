import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadQuiz from './components/faylYuklash'; // UploadQuiz komponentini import qilish
import AdminFan from './components/AdminFan'; // AdminFan komponentini import qilish
import Login from './components/Login'; // Login komponentini import qilish
import Register from './components/Register'; // Register komponentini import qilish
import Navbar from './components/Navbar'; // Navbar komponentini import qilish
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Navbar komponentini qo'shamiz */}

        <div className="content">
          <Routes>
            <Route path="/" element={<h1 className="text-center text-3xl mt-10">Bosh sahifa</h1>} />
            <Route path="/upload" element={<UploadQuiz />} /> {/* Fayl yuklash sahifasi */}
            <Route path="/adminFan" element={<AdminFan />} /> {/* Admin fan sahifasi */}
            <Route path="/login" element={<Login />} /> {/* Login sahifasi */}
            <Route path="/register" element={<Register />} /> {/* Register sahifasi */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
