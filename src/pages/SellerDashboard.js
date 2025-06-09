import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerDashboard.css';
import Popular from '../components/Popular/Popular';
import Footer from '../components/footer/Footer';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [sortOrder, setSortOrder] = useState('newest'); // default sort by newest

  const handleAddProductClick = () => {
    navigate('/AddProduct');
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      localStorage.setItem('darkMode', !prev);
      return !prev;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className={`seller-dashboard-wrapper ${darkMode ? 'dark' : ''}`}>
      {/* Custom Top Header */}
      <div className="custom-top-header">
        <div className="top-left">
          <h2>Welcome Seller</h2>
          <p>Dashboard Overview</p>
        </div>
        <div className="top-right">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="add-product-btn" onClick={handleAddProductClick}>
            Add New Product
          </button>
          <button className="profile-btn" onClick={() => navigate('/SellerProfile')}>
            Profile
          </button>
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>

      {/* Sort Filter */}
      <div className="sort-filter" style={{ maxWidth: '1200px', margin: '1rem auto', padding: '0 2rem' }}>
        <label htmlFor="sortOrder" style={{ marginRight: '0.5rem' }}>Sort by Date:</label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Main Seller Dashboard */}
      <div className="seller-dashboard-container">
        <div className="dashboard-main">
          <div className="dashboard-header">
            <h1>Seller Dashboard</h1>
            <p>Manage your listings and add new preloved items to the marketplace.</p>
          </div>

          <div className="all-item-display">
            <Popular sortOrder={sortOrder} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SellerDashboard;
