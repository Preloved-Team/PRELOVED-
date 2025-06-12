import React, { memo, useEffect, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import './AdminDashboard.css';

// Lazy load components for better performance
const SideBar = lazy(() => import('../components/AdminSideBar/SideBar'));
const Body = lazy(() => import('../components/AdminBodySection/Body'));

const AdminDashboard = () => {
  useEffect(() => {
    // Track page view or initialize something
    console.log('AdminDashboard mounted');
    // Example: You could integrate analytics or focus management here
  }, []);

  return (
    <div className="container" role="main" aria-label="Admin dashboard">
      <aside className="sidebar" aria-label="Admin navigation sidebar">
        <Suspense fallback={<div className="loading">Loading Sidebar...</div>}>
          <SideBar />
        </Suspense>
      </aside>
      <main className="body" tabIndex={-1} aria-live="polite" aria-atomic="true">
        <Suspense fallback={<div className="loading">Loading Content...</div>}>
          <Body />
        </Suspense>
      </main>
    </div>
  );
};

AdminDashboard.propTypes = {
  // Define props here if any in the future
};

export default memo(AdminDashboard);
