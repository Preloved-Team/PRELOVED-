import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerDashboard.css';
import Popular from '../components/Popular/Popular';
import Footer from '../components/footer/Footer';

const SellerDashboard = () => {
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    navigate('/AddProduct');
  };

  return (
    <div>
      {/* Custom Top Header */}
      <div className="custom-top-header">
        <div className="top-left">
          <h2>Welcome Seller</h2>
          <p>Dashboard Overview</p>
        </div>
        <div className="top-right">
          <input type="text" placeholder="Search..." className="search-input" />
          <button
            className="profile-btn"
            onClick={() => navigate('/SellerProfile')}
          >
            Profile
          </button>
        </div>
      </div>

      {/* Main Seller Dashboard */}
      <div className="seller-dashboard-container">
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

          <div className="all-item-display">
            <Popular />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SellerDashboard;
