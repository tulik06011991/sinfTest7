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
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/admins");
        console.log(response.data)
        
        setAdmins(response.data);
        setLoading(false);
      } catch (error) {
        setError("Serverdan ma'lumot olishda xatolik yuz berdi!");
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
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
      try {
        const response = await axios.post("http://localhost:5000/admin/admin", formData);
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

  const deleteAdmin = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/admin/${id}`);
      setAdmins(admins.filter((admin) => admin._id !== id));
      setMessage("Admin muvaffaqiyatli o'chirildi!");
    } catch (error) {
      setMessage("Adminni o'chirishda xatolik yuz berdi!");
    }
  };

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
          placeholder="Admin paroli"
          value={formData.password}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mb-4"
        >
          <option value="admin">Admin</option>
          <option value="user">Foydalanuvchi</option>
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
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded w-full hover:bg-indigo-700 transition"
        >
          {editing ? "Yangilash" : "Yaratish"}
        </button>
      </form>

      {message && <p className="text-green-500 text-center mb-4">{message}</p>}

      <h2 className="text-2xl font-semibold mb-4">Adminlar ro'yxati</h2>
      <ul className="bg-white rounded-lg shadow-md">
        {admins.map((admin) => (
          <li key={admin._id} className="flex justify-between items-center p-4 border-b border-gray-200">
            <div>
              <h3 className="font-semibold">{admin.name}</h3>
              <p>{admin.email}</p>
            </div>
            <div>
              <button
                onClick={() => editAdmin(admin)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Tahrirlash
              </button>
              <button
                onClick={() => deleteAdmin(admin._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
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
