// Importing necessary components and assets
import Login from './Login';
import Navbar from '../components/navbar/navbar';
import Cart from './Cart';
import { Routes, Route } from 'react-router-dom'; // Routing components
import ShopCategory from './ShopCategory';
import Product from './Product';
import './BuyerDashboard.css'; // Styles specific to the BuyerDashboard
import Popular from '../components/Popular/Popular'; // Component displaying popular items
import Products from '../components/Assets/Products.json'; // Product data (unused here, but imported)
import PreLoved_banner from '../components/Assets/preloved banner.jpeg'; // Banner image (unused here)
import Top from '../components/AdminBodySection/TopSection/Top'; // Top section UI component
import logo from '../components/Assets/dodge_challenger.jpg'; // Logo image
import Notification from '../components/Notification'; // Notification message component

const BuyerDashboard = () => {
  return (
    <div>
      {/* Top header section for admin or dashboard */}
      <Top />

      {/* Navigation bar */}
      <Navbar />

      {/* React Router setup for navigating between routes */}
      <Routes>
        {/* Route for each category page */}
        <Route path="menClothing & Accessories" element={<ShopCategory category="Clothing & Accessories" />} />
        <Route path="Electronics & Gadgets" element={<ShopCategory category="Electronics & Gadgets" />} />
        <Route path="Home & Living" element={<ShopCategory category="Home & Living" />} />
        <Route path="Kids & Baby Items" element={<ShopCategory category="Kids & Baby Items" />} />
        <Route path="Vehicles & Automotive" element={<ShopCategory category="Vehicles & Automotive" />} />

        {/* Product routes: dynamic and static */}
        <Route path="product/:productID" element={<Product />} />
        <Route path="product" element={<Product />} />

        {/* Cart and Login routes */}
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
      </Routes>

      {/* Main dashboard content */}
      <div className='dashboard-content'>
        {/* Title */}
        <h1>SHUBHAM'S APP</h1>

        {/* Display popular items */}
        <Popular />

        {/* Display important notifications */}
        <Notification message="You have 2 unread messages from sellers." />
        <Notification message="Your order #1234 has been shipped!" />

        {/* Logo or banner image */}
        <img src={logo} alt="App logo" className='dashboard-content' />
      </div>
    </div>
  );
};

export default BuyerDashboard;
