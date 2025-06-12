import React, { memo, useEffect, Suspense, lazy, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './AdminDashboard.css';
import { Helmet } from 'react-helmet';

// Lazy load components for better performance
const SideBar = lazy(() => import('../components/AdminSideBar/SideBar'));
const Body = lazy(() => import('../components/AdminBodySection/Body'));

// Error Boundary Component for fallback UI on lazy loading errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Error loading component:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div role="alert" style={{ padding: '1rem', color: 'red' }}>Something went wrong while loading.</div>;
    }
    return this.props.children;
  }
}

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Example: analytics or initialization
    console.log('AdminDashboard mounted');
  }, []);

  // Toggle sidebar collapse state
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin dashboard for managing the application." />
      </Helmet>
      <div className={`container${sidebarCollapsed ? ' sidebar-collapsed' : ''}`} role="main" aria-label="Admin dashboard">
        <aside className="sidebar" aria-label="Admin navigation sidebar" aria-expanded={!sidebarCollapsed}>
          <ErrorBoundary>
            <Suspense fallback={<div className="loading" aria-live="polite">Loading Sidebar...</div>}>
              <SideBar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
            </Suspense>
          </ErrorBoundary>
        </aside>
        <main className="body" tabIndex={-1} aria-live="polite" aria-atomic="true">
          <ErrorBoundary>
            <Suspense fallback={<div className="loading" aria-live="polite">Loading Content...</div>}>
              <Body />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </>
  );
};

AdminDashboard.propTypes = {
  // If you add props later, define them here
};

export default memo(AdminDashboard);
