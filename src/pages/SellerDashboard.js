import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerDashboard.css';
import Popular from '../components/Popular/Popular';
import Footer from '../components/footer/Footer';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: 'Gursehbaj',
    email: 'Gursehbaj@example.com',
    phone: '',
    address: '',
    bio: '',
    profilePic: null,
    profilePicUrl: ''
  });

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('sellerProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);

  const handleAddProductClick = () => {
    navigate('/AddProduct');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          profilePic: file,
          profilePicUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // Save to localStorage
    localStorage.setItem('sellerProfile', JSON.stringify(profileData));
  };

  return (
    <>
      <div className="seller-dashboard-container">
        {/* Left Side Profile Section */}
        <div className="profile-sidebar">
          <div className="profile-header">
            {profileData.profilePicUrl ? (
              <img 
                src={profileData.profilePicUrl} 
                alt="Profile" 
                className="profile-pic"
              />
            ) : (
              <div className="profile-placeholder">
                {profileData.name.charAt(0).toUpperCase()}
              </div>
            )}
            <h2>{profileData.name}</h2>
            <p>{profileData.email}</p>
          </div>

          <div className="profile-details">
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself"
                rows="3"
              />
            </div>

            <div className="profile-actions">
              <input
                type="file"
                id="profile-pic-input"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="profile-pic-input" className="upload-btn">
                {profileData.profilePic ? 'Change Photo' : 'Upload Photo'}
              </label>
              <button className="save-profile-btn" onClick={handleSaveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Main Content */}
        <div className="dashboard-main">
          <div className="dashboard-header">
            <h1>Seller Dashboard</h1>
            <p>Manage your listings and add new preloved items to the marketplace.</p>
          </div>

          <div className="dashboard-actions">
            <button className="add-product-btn" onClick={handleAddProductClick}>
              Add New Product
            </button>
          </div>

          <div className='all-item-display'>
            <Popular />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SellerDashboard;