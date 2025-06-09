import React from 'react';
import './BuyerDashboard.css';
import Navbar from '../components/navbar/navbar';
import Top from '../components/AdminBodySection/TopSection/Top';
import Popular from '../components/Popular/Popular';
import Footer from '../components/footer/Footer';

const BuyerDashboard = () => {
  return (
    <div className="buyer-dashboard">
      {/* Top Banner / Header Section */}
      <Top />

      {/* Main Content */}
      <main>
        {/* Navigation Bar */}
        <Navbar />

        {/* Popular Items Section */}
        <section className="popular-section">
          <Popular />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BuyerDashboard;
