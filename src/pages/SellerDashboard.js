import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SellerDashboard.css';
import Footer from '../components/footer/Footer';
import Top from '../components/AdminBodySection/TopSection/Top';
import Hero from '../components/hero/Hero';

const SellerDashboard = () => {
  const navigate = useNavigate();
  
  const handleAddProductClick = () => {
    navigate('/AddProduct'); 
  };

  return (
    <>
    <Top/>
    <Hero/>
    <div className="seller-dashboard">
      <p>Manage your listings and add new preloved items to the marketplace.</p>
      <div className="button-container">
        <button className="add-product-btn" onClick={handleAddProductClick}>
          Add New Product
        </button>
        <Link to='/sellerMessages'>
          <button className='mssge-bttn'>Notifications</button>
        </Link>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SellerDashboard;
