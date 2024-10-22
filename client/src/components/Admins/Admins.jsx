import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminCRUD = () => {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
    subject: "",
  });
  const [editing, setEditing] = useState(false);
  const [currentAdminId, setCurrentAdminId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate= useNavigate()

    useEffect(() => {
        // Local storage'da tokenni tekshirish
        const token = localStorage.getItem('token');

        // Agar token mavjud bo'lmasa, login sahifasiga yo'naltirish
        if (!token) {
            navigate('/login'); // Login sahifasining yo'li
        }
    }, [navigate]);

  // Adminlar ro'yxatini olish
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/admins");
        setAdmins(response.data);
        setLoading(false);
      } catch (error) {
        setError("Serverdan ma'lumot olishda xatolik yuz berdi!");
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  // Form ma'lumotlarini boshqarish
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Yangi admin yaratish yoki mavjud adminni yangilash
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      // Adminni yangilash
      try {
        await axios.put(`http://localhost:5000/admin/admin/${currentAdminId}`, formData);
        setMessage("Admin muvaffaqiyatli yangilandi!");
        setAdmins(
          admins.map((admin) =>
            admin._id === currentAdminId ? { ...admin, ...formData } : admin
          )
        );
        setEditing(false);
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "admin",
          subject: "",
        });
      } catch (error) {
        setMessage("Adminni yangilashda xatolik yuz berdi!");
      }
    } else {
      // Yangi admin yaratish
      try {
        const response = await axios.post("http://localhost:5000/admin/admin", formData);
        console.log(response.data)
        
        setAdmins([...admins, response.data]);
        setMessage("Admin muvaffaqiyatli yaratildi!");
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "admin",
          subject: "",
        });
      } catch (error) {
        setMessage("Adminni yaratishda xatolik yuz berdi!");
      }
    }
  };

  // Adminni o'chirish
  const deleteAdmin = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/admin/${id}`);
      setAdmins(admins.filter((admin) => admin._id !== id));
      setMessage("Admin muvaffaqiyatli o'chirildi!");
    } catch (error) {
      setMessage("Adminni o'chirishda xatolik yuz berdi!");
    }
  };

  // Adminni tahrirlashga tayyorlash
  const editAdmin = (admin) => {
    setEditing(true);
    setCurrentAdminId(admin._id);
    setFormData({
      name: admin.name,
      email: admin.email,
      password: "",
      role: admin.role,
      subject: admin.subject,
    });
  };

  if (loading) return <p className="text-center">Yuklanmoqda...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Admin CRUD Paneli</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-semibold mb-4">{editing ? "Adminni tahrirlash" : "Yangi admin yaratish"}</h2>
        <input
          type="text"
          name="name"
          placeholder="Admin ismi"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        <input
          type="email"
          name="email"
          placeholder="Admin emaili"
          value={formData.email}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Parol"
          value={formData.password}
          onChange={handleChange}
          required={!editing} // Tahrirlashda parol bo'sh bo'lishi mumkin
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        <select name="role" value={formData.role} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full mb-4">
          <option value="admin">Admin</option>
          <option value="superadmin">Superadmin</option>
        </select>
        <input
          type="text"
          name="subject"
          placeholder="Fan"
          value={formData.subject}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200 w-full">
          {editing ? "Yangilash" : "Yaratish"}
        </button>
      </form>

      {message && <p className="text-center text-green-500 mb-4">{message}</p>}

      <h2 className="text-2xl font-semibold mb-4">Adminlar Ro'yxati</h2>
      <ul className="bg-white rounded-lg shadow-md">
        {admins.map((admin) => (
          <li key={admin._id} className="flex justify-between items-center p-4 border-b border-gray-300">
            <div>
              <h3 className="font-bold">{admin.name}</h3>
              <p>{admin.email} - {admin.role} ({admin.subject})</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => editAdmin(admin)} className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600">
                Tahrirlash
              </button>
              <button onClick={() => deleteAdmin(admin._id)} className="bg-red-500 text-white p-1 rounded hover:bg-red-600">
                O'chirish
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCRUD;
