import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-blue-600 shadow-md">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    <Link to="/">Quiz App</Link>
                </div>
                <div className="hidden md:flex space-x-4">
                    <Link to="/login" className="text-white hover:bg-blue-700 px-3 py-2 rounded">
                        Tizimga kirish
                    </Link>
                    <Link to="/register" className="text-white hover:bg-blue-700 px-3 py-2 rounded">
                        Ro'yxatdan o'tish
                    </Link>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="flex flex-col space-y-2 px-4 pb-4">
                    <Link to="/login" className="text-white hover:bg-blue-700 px-3 py-2 rounded">
                        Tizimga kirish
                    </Link>
                    <Link to="/register" className="text-white hover:bg-blue-700 px-3 py-2 rounded">
                        Ro'yxatdan o'tish
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;