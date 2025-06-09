import React, { useState, useEffect } from 'react';
import './BuyerDashboard.css';
import Navbar from '../components/navbar/navbar';
import Top from '../components/AdminBodySection/TopSection/Top';
import Popular from '../components/Popular/Popular';
import Footer from '../components/footer/Footer';
import { FaSearch, FaFilter, FaSmileBeam } from 'react-icons/fa';

const BuyerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [userName, setUserName] = useState('');

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
      <section className="welcome-banner gradient-bg">
        <h1>Welcome back, <span className="highlight">{userName}</span>! <FaSmileBeam /></h1>
        <p>Discover unique preloved items curated just for you.</p>

        <div className="search-controls">
          <div className="search-box">
            <FaSearch className="icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-box">
            <FaFilter className="icon" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Clothing_Accessories">Clothing & Accessories</option>
              <option value="Electronics_Gadgets">Electronics & Gadgets</option>
              <option value="Home_Decor">Home & Decor</option>
              <option value="Kids_Baby_Items">Kids & Baby Items</option>
              <option value="Vehicles_Automotive">Vehicles & Automotive</option>
            </select>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="dashboard-stats">
        <div className="stat-box shadow">
          <h2>🛍️ 150+</h2>
          <p>Active Listings</p>
        </div>
        <div className="stat-box shadow">
          <h2>🔥 30+</h2>
          <p>Best Deals Today</p>
        </div>
        <div className="stat-box shadow">
          <h2>⭐ 50+</h2>
          <p>Highly Rated Items</p>
        </div>
      </section>

      {/* Popular Items */}
      <main>
        <section className="popular-section">
          <h2 className="section-title">Featured Deals for You</h2>
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