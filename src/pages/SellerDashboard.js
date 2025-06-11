import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerDashboard.css';
import Popular from '../components/Popular/Popular';
import Footer from '../components/footer/Footer';
import Top from '../components/AdminBodySection/TopSection/Top';
import Listing from '../components/AdminBodySection/ListingSection/Listing';

const SellerDashboard = () => {
  const navigate = useNavigate();
  

  const handleAddProductClick = () => {
    navigate('/AddProduct'); 
  };

  return (
    <>
    <Top/>
    <div className="seller-dashboard">
      <p>Manage your listings and add new preloved items to the marketplace.</p>

      <button className="add-product-btn" onClick={handleAddProductClick}>
         Add New Product
      </button>
    </div>
    <div className='all-item-dispaly'>
      <Popular/>
      <Listing/>
    </div>
    <Footer/>
    </>
  );
};

export default SellerDashboard;
