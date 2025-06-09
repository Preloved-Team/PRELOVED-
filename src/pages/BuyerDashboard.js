import React, { useState, useEffect } from 'react';
import './BuyerDashboard.css';
import Navbar from '../components/navbar/navbar';
import Top from '../components/AdminBodySection/TopSection/Top';
import Popular from '../components/Popular/Popular';
import Footer from '../components/footer/Footer';

const BuyerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [userName, setUserName] = useState('Arsh'); // Replace with auth user name if available

  useEffect(() => {
    // Simulate fetching user data from context/auth
    setUserName('Arsh');
  }, []);

  return (
    <div className="buyer-dashboard">
      {/* Header */}
      <header>
        <Top />
        <Navbar />
      </header>

      {/* Welcome & Search */}
      <section className="welcome-banner">
        <h1>Welcome back, {userName}! 👋</h1>
        <p>Find preloved treasures at unbeatable prices.</p>

        <div className="search-controls">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Clothing_Accessories">Clothing & Accessories</option>
            <option value="Electronics_Gadgets">Electronics & Gadgets</option>
            <option value="Home_Decor">Home & Decor</option>
          </select>
        </div>
      </section>

      {/* Stats */}
      <section className="dashboard-stats">
        <div className="stat-box">
          <h2>🛍️ 150+</h2>
          <p>Active Listings</p>
        </div>
        <div className="stat-box">
          <h2>🔥 30+</h2>
          <p>Best Deals Today</p>
        </div>
      </section>

      {/* Popular Items */}
      <main>
        <section className="popular-section">
          <h2>Featured Deals for You</h2>
          <Popular search={searchQuery} category={category} />
        </section>
      </main>

      {/* Feedback CTA */}
      <section className="feedback-banner">
        <p>Enjoying the platform? <a href="/feedback">Send us feedback 💌</a></p>
      </section>

      <Footer />
    </div>
  );
};

export default BuyerDashboard;
