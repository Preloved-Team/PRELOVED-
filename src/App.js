import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import ShopCategory from './pages/ShopCategory';
import Navbar from './components/navbar/navbar';
import Product from './pages/Product';
import Cart from './pages/Cart';
import AdminAddProduct from './pages/AdminAddProducts/AddProduct';
import ResetPassword from './pages/resetPassword/ResetPassword';

// Category banners
import PreLovedBanner from './components/Assets/preloved banner.jpeg';
import ClothingBanner from './components/Assets/Clothing_Accessories banner.jpeg';
import ElectronicBanner from './components/Assets/Electronics_Gadgets.jpg';
import HomeBanner from './components/Assets/Home_Living.jpg';
import KidsBanner from './components/Assets/Kids_Baby_Items.webp';
import VehicleBanner from './components/Assets/Vehicles_Automotive.jpeg';

function AppWrapper() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BuyerDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/BuyerDashboard/*" element={<BuyerDashboard />} />
        <Route path="/SellerDashboard" element={<SellerDashboard />} />
        <Route
          path="/Clothing_Accessories"
          element={<ShopCategory banner={ClothingBanner} category="Clothing_Accessories" />}
        />
        <Route
          path="/Electronics_Gadgets"
          element={<ShopCategory banner={ElectronicBanner} category="Electronics_Gadgets" />}
        />
        <Route
          path="/Home_Living"
          element={<ShopCategory banner={HomeBanner} category="Home_Living" />}
        />
        <Route
          path="/Kids_Baby_Items"
          element={<ShopCategory banner={KidsBanner} category="Kids_Baby_Items" />}
        />
        <Route
          path="/Vehicles_Automotive"
          element={<ShopCategory banner={VehicleBanner} category="Vehicles_Automotive" />}
        />
        <Route path="/product/:productID" element={<Product />} />
        <Route path="/AddProduct" element={<AdminAddProduct />} />
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
