import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import ShopCategory from './pages/ShopCategory';
import Navbar from './components/navbar/navbar';

function AppWrapper() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/' || location.pathname === '/login';
//just to test commit
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/BuyerDashboard/*" element={<BuyerDashboard />} />
        <Route path="/sellerDashboard" element={<SellerDashboard />} />
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
