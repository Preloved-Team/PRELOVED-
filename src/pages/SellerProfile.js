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

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    const stored = localStorage.getItem('sellerProfile');
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

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

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      localStorage.setItem('darkMode', !prev);
      return !prev;
    });
  };

  return (
    <div className={`profile-page ${darkMode ? 'dark' : ''}`}>
      <header className="profile-header">
        <h2>Seller Profile</h2>
        <div
          className="dark-mode-toggle-wrapper"
          onClick={() => setDarkMode(d => {
            localStorage.setItem('darkMode', !d);
            return !d;
          })}
        >
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
              aria-label="Toggle dark mode"
            />
            <span className="slider round"></span>
          </label>
          <span className="dark-toggle-label">Dark</span>
        </div>
      </header>

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
