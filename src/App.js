import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Mens from './pages/Mens';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import ShopCategory from './pages/ShopCategory';
import Navbar from './components/navbar/navbar';
import Product from './pages/Product';
import Cart from './pages/Cart';

import PreLoved_banner from './components/Assets/preloved banner.jpeg';
import Clothing_banner from './components/Assets/Clothing_Accessories banner.jpeg';
import Electrnic_Banner from './components/Assets/Electronics_Gadgets.jpg';
import Home_banner from './components/Assets/Home_Living.jpg';
import Kids_banner from './components/Assets/Kids_Baby_Items.webp';
import Vechile_banner from './components/Assets/Vehicles_Automotive.jpeg';

function AppWrapper() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/' || location.pathname === '/login';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/buyer/*" element={<BuyerDashboard />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/Mens" element={<Mens />} />
        <Route
          path="/Clothing_Accessories"
          element={<ShopCategory banner={Clothing_banner} category="Clothing_Accessories" />}
        />
        <Route
          path="/Electronics_Gadgets"
          element={<ShopCategory banner={Electrnic_Banner} category="Electronics_Gadgets" />}
        />
        <Route
          path="/Home_Living"
          element={<ShopCategory banner={Home_banner} category="Home_Living" />}
        />
        <Route
          path="/Kids_Baby_Items"
          element={<ShopCategory banner={Kids_banner} category="Kids_Baby_Items" />}
        />
        <Route
          path="/Vehicles_Automotive"
          element={<ShopCategory banner={Vechile_banner} category="Vehicles_Automotive" />}
        />
        <Route path="/product/:productID" element={<Product />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
