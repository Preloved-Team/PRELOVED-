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
import Invoice from './pages/Invoice';


function AppWrapper() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BuyerDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/ResetPassword' element={<ResetPassword/>} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/BuyerDashboard/*" element={<BuyerDashboard />} />
        <Route path="/sellerDashboard" element={<SellerDashboard />} />
        <Route path="/Clothing_Accessories" element={<ShopCategory category="Clothing_Accessories" />} />
        <Route path="/Electronics_Gadgets" element={<ShopCategory category="Electronics_Gadgets" />} />
        <Route path="/Home_Living" element={<ShopCategory category="Home_Living" />} />
        <Route path="/Kids_Baby_Items" element={<ShopCategory category="Kids_Baby_Items" />} />
        <Route path="/Vehicles_Automotive" element={<ShopCategory category="Vehicles_Automotive" />} />
        <Route path="/product/:productID" element={<Product />} />
        <Route path="/AddProduct" element={<AdminAddProduct />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/invoice" element={<Invoice />} />
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
