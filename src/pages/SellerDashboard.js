import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerDashboard.css';
import Popular from '../components/Popular/Popular';
import Top from '../components/AdminBodySection/TopSection/Top';
import Footer from '../components/footer/Footer';

const SellerDashboard = () => {
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    navigate('/AddProduct');
  };

  return (
    <div>
      <Top />
      <div>
       

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
    </div>
  );
};

export default SellerDashboard;
