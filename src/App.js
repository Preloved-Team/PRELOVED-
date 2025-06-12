// App.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from './components/navbar/navbar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { useAuth } from './hooks/useAuth'; // Custom hook for auth status & role

// Lazy-loaded pages
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const BuyerDashboard = lazy(() => import('./pages/BuyerDashboard'));
const SellerDashboard = lazy(() => import('./pages/SellerDashboard'));
const ShopCategory = lazy(() => import('./pages/ShopCategory'));
const Product = lazy(() => import('./pages/Product'));
const Cart = lazy(() => import('./pages/Cart'));
const Mens = lazy(() => import('./pages/Mens'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Banner images imports (consider moving to a constants file)
import ClothingBanner from './components/Assets/Clothing_Accessories_banner.jpeg';
import ElectronicsBanner from './components/Assets/Electronics_Gadgets.jpg';
import HomeBanner from './components/Assets/Home_Living.jpg';
import KidsBanner from './components/Assets/Kids_Baby_Items.webp';
import VehiclesBanner from './components/Assets/Vehicles_Automotive.jpeg';

// Layout component to manage Navbar and layout wrappers
const Layout = ({ hideNavbarPaths = [] }) => {
  const location = useLocation();
  const hideNavbar = hideNavbarPaths.includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

// Role-based Private Route
const PrivateRoute = ({ roles = [], children }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (roles.length > 0 && !roles.includes(userRole)) {
    // Unauthorized access
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

// Centralized route config for scalability
const routes = [
  { path: '/', element: <Login />, meta: { title: 'Login' } },
  { path: '/login', element: <Login />, meta: { title: 'Login' } },
  { path: '/register', element: <Register />, meta: { title: 'Register' } },
  {
    path: '/admin',
    element: (
      <PrivateRoute roles={['admin']}>
        <AdminDashboard />
      </PrivateRoute>
    ),
    meta: { title: 'Admin Dashboard' },
  },
  {
    path: '/buyer/*',
    element: (
      <PrivateRoute roles={['buyer']}>
        <BuyerDashboard />
      </PrivateRoute>
    ),
    meta: { title: 'Buyer Dashboard' },
  },
  {
    path: '/seller',
    element: (
      <PrivateRoute roles={['seller']}>
        <SellerDashboard />
      </PrivateRoute>
    ),
    meta: { title: 'Seller Dashboard' },
  },
  { path: '/mens', element: <Mens />, meta: { title: "Men's Collection" } },
  {
    path: '/category/clothing',
    element: <ShopCategory banner={ClothingBanner} category="Clothing_Accessories" />,
    meta: { title: 'Clothing & Accessories' },
  },
  {
    path: '/category/electronics',
    element: <ShopCategory banner={ElectronicsBanner} category="Electronics_Gadgets" />,
    meta: { title: 'Electronics & Gadgets' },
  },
  {
    path: '/category/home-living',
    element: <ShopCategory banner={HomeBanner} category="Home_Living" />,
    meta: { title: 'Home & Living' },
  },
  {
    path: '/category/kids-baby',
    element: <ShopCategory banner={KidsBanner} category="Kids_Baby_Items" />,
    meta: { title: 'Kids & Baby Items' },
  },
  {
    path: '/category/vehicles',
    element: <ShopCategory banner={VehiclesBanner} category="Vehicles_Automotive" />,
    meta: { title: 'Vehicles & Automotive' },
  },
  { path: '/product/:productID', element: <Product />, meta: { title: 'Product Details' } },
  { path: '/cart', element: <Cart />, meta: { title: 'Your Cart' } },
  { path: '*', element: <NotFound />, meta: { title: 'Page Not Found' } },
];

// Dynamic Route Rendering Component with Helmet support
const RenderRoutes = () => {
  const location = useLocation();

  // Find matching route meta for Helmet
  const currentRoute = routes.find((route) => {
    // Simple path match; for more complex matching use path-to-regexp or matchPath
    if (route.path === location.pathname) return true;
    if (route.path.includes(':') && location.pathname.startsWith(route.path.split('/:')[0])) return true;
    return false;
  });

  return (
    <>
      <Helmet>
        <title>{currentRoute?.meta?.title || 'PreLoved Store'}</title>
        <meta name="description" content={`Page for ${currentRoute?.meta?.title || 'PreLoved Store'}`} />
      </Helmet>

      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </>
  );
};

const AppWrapper = () => {
  const hideNavbarPaths = ['/', '/login', '/register'];

  return (
    <Layout hideNavbarPaths={hideNavbarPaths}>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <RenderRoutes />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
};

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppWrapper />
      </Router>
    </HelmetProvider>
  );
}
