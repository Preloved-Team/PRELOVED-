import React from 'react';

const Profile = () => {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input type="text" placeholder="Your Name" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" placeholder="you@example.com" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input type="tel" placeholder="Your phone number" className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
