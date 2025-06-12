import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/navbar/navbar';
import LoadingSpinner from './components/common/LoadingSpinner'; // Create this for a better UX

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

// Banner assets
import ClothingBanner from './components/Assets/Clothing_Accessories banner.jpeg';
import ElectronicsBanner from './components/Assets/Electronics_Gadgets.jpg';
import HomeBanner from './components/Assets/Home_Living.jpg';
import KidsBanner from './components/Assets/Kids_Baby_Items.webp';
import VehicleBanner from './components/Assets/Vehicles_Automotive.jpeg';

// Layout wrapper
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = ['/login', '/'].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className="main-content">{children}</main>
    </>
  );
};

// 404 fallback component
const NotFound = () => (
  <div className="not-found-page">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <a href="/" className="btn btn-primary">Go to Home</a>
  </div>
);

// AppWrapper with advanced routing logic
function AppWrapper() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Layout>
        <Routes>
          {/* Auth routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboards */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/buyer/*" element={<BuyerDashboard />} />
          <Route path="/seller" element={<SellerDashboard />} />

          {/* Shopping and category routes */}
          <Route path="/mens" element={<Mens />} />
          <Route
            path="/category/clothing"
            element={<ShopCategory banner={ClothingBanner} category="Clothing_Accessories" />}
          />
          <Route
            path="/category/electronics"
            element={<ShopCategory banner={ElectronicsBanner} category="Electronics_Gadgets" />}
          />
          <Route
            path="/category/home"
            element={<ShopCategory banner={HomeBanner} category="Home_Living" />}
          />
          <Route
            path="/category/kids"
            element={<ShopCategory banner={KidsBanner} category="Kids_Baby_Items" />}
          />
          <Route
            path="/category/vehicles"
            element={<ShopCategory banner={VehicleBanner} category="Vehicles_Automotive" />}
          />

          {/* Product and cart */}
          <Route path="/product/:productID" element={<Product />} />
          <Route path="/cart" element={<Cart />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
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
