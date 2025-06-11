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
import Wishlist from './pages/Wishlist';
import OrderDetail from './pages/OrderDetail'; // 💡 Add this if using Order Details
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Messages from './pages/Messages';
import Inbox from './pages/Inbox';



function AppWrapper() {
  return (
    <>
      <Routes>
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/order/:orderId" element={<OrderDetail />} />

        {/* Protected Routes */}
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

        {/* Shop Categories */}
        <Route path="/Clothing_Accessories" element={<ShopCategory category="Clothing_Accessories" />} />
        <Route path="/Electronics_Gadgets" element={<ShopCategory category="Electronics_Gadgets" />} />
        <Route path="/Home_Living" element={<ShopCategory category="Home_Living" />} />
        <Route path="/Kids_Baby_Items" element={<ShopCategory category="Kids_Baby_Items" />} />
        <Route path="/Vehicles_Automotive" element={<ShopCategory category="Vehicles_Automotive" />} />

        {/* Product & Admin Tools */}
        <Route path="/product/:productID" element={<Product />} />
        <Route path="/AddProduct" element={<AdminAddProduct />} />
        <Route path="/adminpermissions" element={<AdminPermissions />} />
        <Route path="/all_products" element={<All_Products />} />
        <Route path="/adminOrder" element={<AdminOrders />} />
        <Route path="/adminEarning" element={<AdminEarning />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>

      {/* ✅ Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />
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
