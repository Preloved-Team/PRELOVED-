import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import Profile from './pages/profile/Profile';
import Payment from './pages/payment/Payment';
import ProductDetail from './pages/ProductDetail';
import AdminAddProduct from './pages/AdminAddProducts/AddProduct';
import ResetPassword from './pages/resetPassword/ResetPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Category banners
import ClothingBanner from './components/Assets/Clothing_Accessories banner.jpeg';
import ElectronicBanner from './components/Assets/Electronics_Gadgets.jpg';
import HomeBanner from './components/Assets/Home_Living.jpg';
import KidsBanner from './components/Assets/Kids_Baby_Items.webp';
import VehicleBanner from './components/Assets/Vehicles_Automotive.jpeg';

function AppWrapper() {
  return (
    <>
      <Routes>
        {/* Auth & Reset */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />

        {/* Dashboards */}
        <Route path="/" element={<BuyerDashboard />} />
        <Route path="/BuyerDashboard/*" element={<BuyerDashboard />} />
        <Route path="/SellerDashboard" element={<SellerDashboard />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />

        {/* Shop Category Pages */}
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

        {/* Pages */}
        <Route path="/AddProduct" element={<AdminAddProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>

      {/* Global Toast Notifications */}
      <ToastContainer position="top-right" autoClose={2000} />
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
