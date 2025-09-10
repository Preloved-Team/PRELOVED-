// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/resetPassword/ResetPassword';
import AdminDashboard from './pages/AdminDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import Cart from './pages/Cart';
import AdminAddProduct from './pages/AdminAddProducts/AddProduct';
import Payment from './pages/payment/Payment';
import AdminPermissions from './pages/adminPermissions/AdminPermissions';
import AdminOrders from './pages/adminOrder/AdminOrders';
import AdminEarning from './pages/AmdinEarning/AdminEarning';
import Feedback from './pages/feedback/Feedback';
import All_Products from './components/All_Products/All_Products';
import Profile from './pages/profile/Profile';
import WishList from './pages/wishList/WishList';
import AdminCharts from './pages/adminCharts/AdminCharts';

// Components
import Messages from './components/message/Messages';
import Notifications from './components/notifications/Notifications';
import SellerMessages from './components/SellerMessages/SellerMessages';
import SellerListings from './components/sellerListing/SellerListing';

// Protected route wrapper
import ProtectedRoutes from './ProtectedRoutes';

function NotFound() {
  return (
    <div className="text-center mt-5">
      <h2>404 — Page not found</h2>
      <p>The page you requested does not exist.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/product/:productID" element={<Product />} />
        <Route path="/product" element={<Product />} />
        <Route path="/all_products" element={<All_Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/message" element={<Messages />} />
        <Route path="/sellerMessages" element={<SellerMessages />} />
        <Route path="/sellerListing" element={<SellerListings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/feedback" element={<Feedback />} />

        {/* Category example route (if ShopCategory uses props) */}
        <Route path="/category/:category" element={<ShopCategory />} />

        {/* Protected routes by role */}
        <Route
          path="/AdminDashboard"
          element={
            <ProtectedRoutes allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/BuyerDashboard"
          element={
            <ProtectedRoutes allowedRoles={['buyer']}>
              <BuyerDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/sellerDashboard"
          element={
            <ProtectedRoutes allowedRoles={['seller']}>
              <SellerDashboard />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/AddProduct"
          element={
            <ProtectedRoutes allowedRoles={['admin', 'seller']}>
              <AdminAddProduct />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/adminpermissions"
          element={
            <ProtectedRoutes allowedRoles={['admin']}>
              <AdminPermissions />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/adminOrder"
          element={
            <ProtectedRoutes allowedRoles={['admin']}>
              <AdminOrders />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/profitChart"
          element={
            <ProtectedRoutes allowedRoles={['admin']}>
              <AdminCharts />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/adminEarning"
          element={
            <ProtectedRoutes allowedRoles={['admin']}>
              <AdminEarning />
            </ProtectedRoutes>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
