import React from 'react';
import './BuyerDashboard.css';
import Navbar from '../components/navbar/navbar';
import Top from '../components/AdminBodySection/TopSection/Top';
import Popular from '../components/Popular/Popular';
import Footer from '../components/footer/Footer';

const BuyerDashboard = () => {
  return (
    <div>
      <Top />
      <div>
        <Navbar />
        <Popular />
        <Footer />
      </div>
    </div>
  );
};

export default BuyerDashboard;
