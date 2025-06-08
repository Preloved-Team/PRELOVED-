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
    <>
      <div className="seller-dashboard-container">
        {/* Main Content Only */}
        <div className="dashboard-main full-width">
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
    </>
  );
};

export default SellerDashboard;
