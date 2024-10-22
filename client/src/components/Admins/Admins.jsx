import React, { useState, useEffect } from "react";
import axios from "axios";

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

  // Adminlar ro'yxatini olish
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("/api/admins");
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
        await axios.put(`/api/admin/${currentAdminId}`, formData);
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
        const response = await axios.post("/api/admin", formData);
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
      await axios.delete(`/api/admin/${id}`);
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

  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Admin CRUD Paneli</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Admin ismi"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Admin emaili"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Parol"
          value={formData.password}
          onChange={handleChange}
          required={!editing} // Tahrirlashda parol bo'sh bo'lishi mumkin
        />
        <select name="role" value={formData.role} onChange={handleChange}>
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
        />
        <button type="submit">
          {editing ? "Yangilash" : "Yaratish"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <h2>Adminlar Ro'yxati</h2>
      <ul>
        {admins.map((admin) => (
          <li key={admin._id}>
            {admin.name} ({admin.email}) - {admin.role} ({admin.subject})
            <button onClick={() => editAdmin(admin)}>Tahrirlash</button>
            <button onClick={() => deleteAdmin(admin._id)}>O'chirish</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCRUD;
