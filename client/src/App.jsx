import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadQuiz from './components/faylYuklash'; // UploadQuiz komponentini import qilish
import AdminFan from './components/AdminFan'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="bg-gray-800 p-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/adminFan" className="text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/upload" className="text-white">
                Quiz Fayl Yuklash
              </Link>
            </li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<h1 className="text-center text-3xl mt-10">Bosh sahifa</h1>} />
            <Route path="/upload" element={<UploadQuiz />} /> {/* Upload sahifasi */}
            <Route path="/adminFan" element={<AdminFan />} /> {/* Upload sahifasi */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
