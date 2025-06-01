import Login from './Login';
import Navbar from '../components/navbar/navbar';
import Cart from './Cart';
import { Routes, Route } from 'react-router-dom';
import ShopCategory from './ShopCategory';
import Product from './Product';
import './BuyerDashboard.css';
import Popular from '../components/Popular/Popular';
import Products from '../components/Assets/Products.json'
import PreLoved_banner from '../components/Assets/preloved banner.jpeg'
import Top from '../components/AdminBodySection/TopSection/Top';
import Footer from '../components/footer/Footer';

const BuyerDashboard = () => {
  return (
    <div>
      <Top/>
    <div>
      <Navbar/>
      <Popular/>
      <Footer/>
    </div>
      
    </div>
  );
};

export default BuyerDashboard;
