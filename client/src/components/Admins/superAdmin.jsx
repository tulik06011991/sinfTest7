import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Router orqali yo'naltirish uchun

const SuperAdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [fans, setFans] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '' });
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate(); // useNavigate hookini qo'shamiz

    // Foydalanuvchilarni olish
    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Foydalanuvchilarni olishda xatolik yuz berdi.");
            }
        };
        getUsers();
    }, []);

    // Adminlar va fanlar uchun API chaqiriqlari
    useEffect(() => {
        const getAdminsAndFans = async () => {
            try {
                const adminsResponse = await axios.get("http://localhost:5000/admins");
                const fansResponse = await axios.get("http://localhost:5000/fans");
                setAdmins(adminsResponse.data);
                setFans(fansResponse.data);
            } catch (error) {
                console.error("Adminlar va fanlarni olishda xatolik yuz berdi.");
            }
        };
        getAdminsAndFans();
    }, []);

    // Yangi foydalanuvchi qo'shish
    const addUser = async () => {
        try {
            const response = await axios.post("http://localhost:5000/users", newUser);
            setUsers([...users, response.data]);
            setNewUser({ name: '', email: '' }); // Formani tozalash
        } catch (error) {
            console.error("Foydalanuvchini qo'shishda xatolik yuz berdi.");
        }
    };

    // Foydalanuvchini yangilash
    const updateUser = async (userId) => {
        try {
            const response = await axios.put(`http://localhost:5000/users/${userId}`, selectedUser);
            setUsers(users.map((user) => (user._id === userId ? response.data : user)));
            setSelectedUser(null);
        } catch (error) {
            console.error("Foydalanuvchini yangilashda xatolik yuz berdi.");
        }
    };

    // Foydalanuvchini o'chirish
    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/users/${userId}`);
            setUsers(users.filter((user) => user._id !== userId));
        } catch (error) {
            console.error("Foydalanuvchini o'chirishda xatolik yuz berdi.");
        }
    };

    // Adminlar va fanlar sahifalariga yo'naltirish funksiyalari
    const goToAdmins = () => {
        navigate("/admins"); // Adminlar sahifasiga yo'naltirish
    };

    const goToFans = () => {
        navigate("/adminFan"); // Fanlar sahifasiga yo'naltirish
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">SuperAdmin Panel</h1>
            
            {/* Foydalanuvchilar bo'limi */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Foydalanuvchilar</h2>
                <div className="grid grid-cols-2 gap-4">
                    {users.map((user) => (
                        <div key={user._id} className="p-4 border rounded-md shadow-md">
                            <h3 className="text-lg font-bold">{user.name}</h3>
                            <p>{user.email}</p>
                            <div className="flex justify-between mt-4">
                                <button 
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={() => setSelectedUser(user)}
                                >
                                    Tahrirlash
                                </button>
                                <button 
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => deleteUser(user._id)}
                                >
                                    O'chirish
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Ism"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className="border p-2 rounded-md mr-2"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="border p-2 rounded-md mr-2"
                    />
                    <button 
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={addUser}
                    >
                        Yangi foydalanuvchi qo'shish
                    </button>
                </div>
            </div>

            {/* Adminlar va Fanlar bo'limi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Adminlar cardi */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Adminlar</h2>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                        onClick={goToAdmins}
                    >
                        Adminlar Sahifasiga O'tish
                    </button>
                    <div className="grid grid-cols-1 gap-4">
                        {admins.map((admin) => (
                            <div key={admin._id} className="p-4 border rounded-md shadow-md">
                                <h3 className="text-lg font-bold">{admin.name}</h3>
                                <p>{admin.email}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fanlar cardi */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Fanlar</h2>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                        onClick={goToFans}
                    >
                        Fanlar Sahifasiga O'tish
                    </button>
                    <div className="grid grid-cols-1 gap-4">
                        {fans.map((fan) => (
                            <div key={fan._id} className="p-4 border rounded-md shadow-md">
                                <h3 className="text-lg font-bold">{fan.fanNomi}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Foydalanuvchini tahrirlash */}
            {selectedUser && (
                <div className="mt-8 p-4 border rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Foydalanuvchini tahrirlash</h2>
                    <input
                        type="text"
                        value={selectedUser.name}
                        onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                        className="border p-2 rounded-md mr-2"
                    />
                    <input
                        type="email"
                        value={selectedUser.email}
                        onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                        className="border p-2 rounded-md mr-2"
                    />
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => updateUser(selectedUser._id)}
                    >
                        Yangilash
                    </button>
                </div>
            )}
        </div>
    );
};

export default SuperAdminPanel;
