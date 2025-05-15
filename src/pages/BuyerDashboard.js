import Login from './Login';
import Navbar from '../components/navbar/navbar';
import Cart from './Cart';
import { Routes, Route } from 'react-router-dom';
import ShopCategory from './ShopCategory';
import Product from './Product';
import logo from '../components/Assets/dodge_challenger.jpg'
import './BuyerDashboard.css';

const BuyerDashboard = () => {
  return (
    <div>
      <Routes>
        <Route path="menClothing & Accessories" element={<ShopCategory category="Clothing & Accessories" />} />
        <Route path="Electronics & Gadgets" element={<ShopCategory category="Electronics & Gadgets" />} />
        <Route path="Home & Living" element={<ShopCategory category="Home & Living" />} />
        <Route path="Kids & Baby Items" element={<ShopCategory category="Kids & Baby Items" />} />
        <Route path="Vehicles & Automotive" element={<ShopCategory category="Vehicles & Automotive" />} />
        <Route path="product/:productID" element={<Product />} />
        <Route path="product" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
      </Routes>
      <div className='dashboard-content'>
        <h1>SHUBHAM'S APP</h1>
        <img src={logo} alt="App logo" className='dashboard-content' />
      </div>
    </div>
    
  );
};

export default BuyerDashboard;