import React, { useState } from 'react';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '021 123 4567'
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated!');
    // Firebase update logic can go here
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input name="name" value={userInfo.name} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="email" value={userInfo.email} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="phone" value={userInfo.phone} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
