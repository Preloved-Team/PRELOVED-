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
    <div className="seller-dashboard">
      <h1>Welcome, Shubham</h1>
      <p>Manage your listings and add new preloved items to the marketplace.</p>

      <button className="add-product-btn" onClick={handleAddProductClick}>
         Add New Product
      </button>
    </div>
    <div className='all-item-dispaly'>
      <Popular/>
    </div>
    <Footer/>
    </>
  );
};

export default SellerDashboard;
