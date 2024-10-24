import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateFan = () => {
  const [fanlar, setFanlar] = useState([]); // Available fanlar (subjects)
  const [adminlar, setAdminlar] = useState([]); // Available admins
  const [fanNomi, setFanNomi] = useState(''); // Selected fan
  const [adminNomi, setAdminNomi] = useState(''); // Selected admin name
  const [adminEmail, setAdminEmail] = useState(''); // Selected admin email

  const navigate = useNavigate();

  // Fetch available fanlar and adminlar on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      // Fetch fanlar (subjects)
      axios
        .get('http://localhost:5000/api/fan/adminFan', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          
          setFanlar(response.data);
        })
        .catch((error) => {
          console.error('Fanlarni olishda xatolik:', error);
        });

      // Fetch adminlar (admins)
      axios
        .get('http://localhost:5000/admin/admins', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setAdminlar(response.data);
        })
        .catch((error) => {
          console.error('Adminlarni olishda xatolik:', error);
        });
    }
  }, [navigate]);
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fanNomi || !adminNomi || !adminEmail) {
      alert("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    const fanData = {
      fanNomi,
      adminNomi,
      adminEmail,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/fan/create', fanData);
      alert(response.data.message);
      setFanNomi('');
      setAdminNomi('');
      setAdminEmail('');
    } catch (error) {
      console.error('Xatolik:', error);
      alert('Fanni yaratishda xatolik yuz berdi.');
    }
  };

  // Handle admin selection (update email when admin name changes)
  const handleAdminChange = (e) => {
    const selectedAdminName = e.target.value;
    setAdminNomi(selectedAdminName);

    // Find the selected admin's email
    const selectedAdmin = adminlar.find((admin) => admin.name === selectedAdminName);
    if (selectedAdmin) {
      setAdminEmail(selectedAdmin.email);
    }
  };

  return (
    <div className="container mx-auto my-10 p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Fan Yaratish</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Fan Nomi Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Fan Nomi:</label>
          <select
            value={fanNomi}
            onChange={(e) => setFanNomi(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            required
          >
            <option value="" disabled>Fan tanlang</option>
            {fanlar.map((fan) => (
              <option key={fan._id} value={fan.fanNomi}>
                {fan.fanNomi}
              </option>
            ))}
          </select>
        </div>

        {/* Admin Nomi Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Admin Nomi:</label>
          <select
            value={adminNomi}
            onChange={handleAdminChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            required
          >
            <option value="" disabled>Admin tanlang</option>
            {adminlar.map((admin) => (
              <option key={admin._id} value={admin.name}>
                {admin.name}
              </option>
            ))}
          </select>
        </div>

        {/* Admin Email (Automatically populated based on selected admin) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Admin Email:</label>
          <input
            type="email"
            value={adminEmail}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 bg-gray-100"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 w-full"
        >
          Yaratish
        </button>
      </form>

      {/* Fanlar ro'yxati */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Fanlar va Adminlar</h3>
        {fanlar.length > 0 ? (
          <ul className="space-y-4">
            {fanlar.map((fan) => (
              <li key={fan._id} className="p-4 border border-gray-300 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold">Fan: {fan.fanNomi}</h4>
                <p>Admin Nomi: {fan.adminNomi}</p>
                <p>Admin Email: {fan.adminEmail}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Hozircha fanlar mavjud emas.</p>
        )}
      </div>
    </div>
  );
};

export default CreateFan;
