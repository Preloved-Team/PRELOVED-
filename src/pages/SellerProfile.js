import React, { useState, useEffect } from 'react';
import './SellerProfile.css';
import Footer from '../components/footer/Footer';

const SellerProfile = () => {
  const [profile, setProfile] = useState({
    name: 'Gursehbaj',
    email: 'gursehbaj@example.com',
    phone: '',
    address: '',
    bio: '',
    profilePicUrl: ''
  });

  useEffect(() => {
    const stored = localStorage.getItem('sellerProfile');
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profilePicUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('sellerProfile', JSON.stringify(profile));
    alert('Profile saved successfully!');
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-top">
          {profile.profilePicUrl ? (
            <img src={profile.profilePicUrl} alt="Profile" className="profile-pic" />
          ) : (
            <div className="profile-placeholder">{profile.name.charAt(0)}</div>
          )}
          <input type="file" onChange={handleImageChange} />
        </div>
        <h2>{profile.name}</h2>
        <p>{profile.email}</p>

        <div className="profile-form">
          <label>Phone</label>
          <input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Enter phone"
          />

          <label>Address</label>
          <textarea
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Enter address"
          />

          <label>Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            placeholder="Write a short bio"
          />

          <button onClick={handleSave}>Save Profile</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SellerProfile;
