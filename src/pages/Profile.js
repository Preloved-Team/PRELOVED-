import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Optional toast notification
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '021 123 4567',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate Firebase update
    setTimeout(() => {
      setLoading(false);
      toast.success('✅ Profile updated successfully!');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <div className="text-center mb-6">
        <img
          src="https://via.placeholder.com/100"
          alt="User Avatar"
          className="rounded-full mx-auto mb-2"
        />
        <h2 className="text-2xl font-bold">My Profile</h2>
        <p className="text-gray-500">Update your personal details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1 text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={userInfo.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${
              loading && 'opacity-50 cursor-not-allowed'
            }`}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
