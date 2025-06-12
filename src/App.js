import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/navbar/navbar';

// Lazy-loaded pages
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const BuyerDashboard = lazy(() => import('./pages/BuyerDashboard'));
const SellerDashboard = lazy(() => import('./pages/SellerDashboard'));
const Mens = lazy(() => import('./pages/Mens'));
const ShopCategory = lazy(() => import('./pages/ShopCategory'));
const Product = lazy(() => import('./pages/Product'));
const Cart = lazy(() => import('./pages/Cart'));

// Banners
import Clothing_banner from './components/Assets/Clothing_Accessories banner.jpeg';
import Electronic_Banner from './components/Assets/Electronics_Gadgets.jpg';
import Home_banner from './components/Assets/Home_Living.jpg';
import Kids_banner from './components/Assets/Kids_Baby_Items.webp';
import Vehicle_banner from './components/Assets/Vehicles_Automotive.jpeg';

// Layout to wrap routes with navbar
const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = ['/login', '/'].includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className="app-content">{children}</div>
    </>
  );
};

// Fallback error page (Optional)
const NotFound = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>404 - Page Not Found</h2>
    <p>Oops! The page you're looking for doesn't exist.</p>
  </div>
);

function AppWrapper() {
  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <AppLayout>
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin/Seller/Buyer Dashboards */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/buyer/*" element={<BuyerDashboard />} />
          <Route path="/seller" element={<SellerDashboard />} />

          {/* Shop Pages */}
          <Route path="/mens" element={<Mens />} />
          <Route
            path="/category/clothing"
            element={<ShopCategory banner={Clothing_banner} category="Clothing_Accessories" />}
          />
          <Route
            path="/category/electronics"
            element={<ShopCategory banner={Electronic_Banner} category="Electronics_Gadgets" />}
          />
          <Route
            path="/category/home"
            element={<ShopCategory banner={Home_banner} category="Home_Living" />}
          />
          <Route
            path="/category/kids"
            element={<ShopCategory banner={Kids_banner} category="Kids_Baby_Items" />}
          />
          <Route
            path="/category/vehicles"
            element={<ShopCategory banner={Vehicle_banner} category="Vehicles_Automotive" />}
          />

          {/* Product and Cart */}
          <Route path="/product/:productID" element={<Product />} />
          <Route path="/cart" element={<Cart />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </Suspense>
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
