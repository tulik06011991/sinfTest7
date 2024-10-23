import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Loader uchun state

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true); // Loaderni ko'rsatish

        try {
            const userData = { email, password };
            const response = await axios.post("http://localhost:5000/auth/login", userData);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("url", response.data.redirectUrl);

            const redirectUrl = response.data.redirectUrl;
            if (redirectUrl === "/savolJavoblar") {
                window.location.href = "/test";
            } else if (redirectUrl === "/superadmin/dashboard") {
                window.location.href = "/superadmin";
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : "Server xatosi!");
        }

        setLoading(false); // Loaderni yashirish
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Tizimga kirish</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {loading && <p className="text-center">Yuklanmoqda...</p>} {/* Loader */}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="password">Parol</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
                        disabled={loading} // Loader ishlayotgan paytda disable qilish
                    >
                        Kirish
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Hisobingiz yo'qmi?{' '}
                    <a href="/register" className="text-blue-500 hover:underline">Ro'yxatdan o'ting</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
