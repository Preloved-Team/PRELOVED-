import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import Cart from './pages/Cart';
import AdminAddProduct from './pages/AdminAddProducts/AddProduct';
import ResetPassword from './pages/resetPassword/ResetPassword';
import Payment from './pages/payment/Payment';
import AdminPermissions from './pages/adminPermissions/AdminPermissions';
import AdminOrders from './pages/adminOrder/AdminOrders';
import LandingPage from './pages/LandingPage/LandingPage';
import AdminEarning from './pages/AmdinEarning/AdminEarning';
import Feedback from './pages/feedback/Feedback';
import All_Products from './components/All_Products/All_Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './pages/profile/Profile';
import ProtectedRoutes from './ProtectedRoutes';
import WishList from './pages/wishList/WishList';
import Messages from './components/message/Messages';
import Notifications from './components/notifications/Notifications';
import SellerMessages from './components/SellerMessages/SellerMessages';
import SellerListings from './components/sellerListing/SellerListing';

function AppWrapper() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path='/ResetPassword' element={<ResetPassword/>} />
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
        <Route path="/Clothing_Accessories" element={<ShopCategory category="Clothing_Accessories" />} />
        <Route path="/Electronics_Gadgets" element={<ShopCategory category="Electronics_Gadgets" />} />
        <Route path="/Home_Living" element={<ShopCategory category="Home_Living" />} />
        <Route path="/Kids_Baby_Items" element={<ShopCategory category="Kids_Baby_Items" />} />
        <Route path="/Vehicles_Automotive" element={<ShopCategory category="Vehicles_Automotive" />} />
        <Route path="/product/:productID" element={<Product />} />
        <Route path="/AddProduct" element={<AdminAddProduct />} />
        <Route path="/adminpermissions" element={<AdminPermissions />} />
        <Route path="/all_products" element={<All_Products />} />
        <Route path="/adminOrder" element={<AdminOrders />} />
        <Route path="/product" element={<Product />} />
        <Route path="/message" element={<Messages />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/sellerMessages" element={<SellerMessages />} />
        <Route path="/sellerListing" element={<SellerListings />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/adminEarning" element={<AdminEarning />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/login" element={<Login />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path="/notifications" element={<Notifications />} />
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
