import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerDashboard.css';
import Popular from '../components/Popular/Popular';
import Footer from '../components/footer/Footer';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [sortOrder, setSortOrder] = useState('newest');
  const [stats, setStats] = useState({
    products: 24,
    sales: 156,
    views: 1243
  });

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
    document.body.classList.toggle('dark-mode', darkMode);
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

      {/* Stats Overview Section */}
      <div className="stats-overview">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{stats.products}</p>
        </div>
        <div className="stat-card">
          <h3>Total Sales</h3>
          <p>{stats.sales}</p>
        </div>
        <div className="stat-card">
          <h3>Total Views</h3>
          <p>{stats.views}</p>
        </div>
      </div>

      {/* Sort Filter Section */}
      <div className="sort-filter">
        <label htmlFor="sortOrder">Sort by:</label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-high">Price (High to Low)</option>
          <option value="price-low">Price (Low to High)</option>
        </select>
      </div>

      {/* Main Dashboard Content */}
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

        {/* Recent Activity Sidebar */}
        <aside className="dashboard-sidebar">
          <h3>Recent Activity</h3>
          <ul>
            <li>Product "Vintage Chair" sold</li>
            <li>New message from buyer</li>
            <li>New review received</li>
          </ul>
        </aside>
      </div>

      <Footer />
    </div>
  );
};

export default SellerDashboard;