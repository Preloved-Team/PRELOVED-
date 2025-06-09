import React from 'react';
import './BuyerDashboard.css';
import Navbar from '../components/navbar/navbar';
import Top from '../components/AdminBodySection/TopSection/Top';
import Popular from '../components/Popular/Popular';
import Footer from '../components/footer/Footer';

const BuyerDashboard = () => {
  return (
    <div className="buyer-dashboard">
      {/* Header */}
      <header>
        <Top />
        <Navbar />
      </header>

      {/* Welcome Section */}
      <section className="welcome-banner">
        <h1>Welcome to Preloved Marketplace 👋</h1>
        <p>Discover great deals on secondhand items from trusted sellers.</p>
      </section>

      {/* Main content */}
      <main>
        <section className="popular-section">
          <h2>🔥 Trending Now</h2>
          <Popular />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BuyerDashboard;
