import React, { memo, useEffect, Suspense, lazy, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async'; // Using react-helmet-async for better SSR support
import './AdminDashboard.css';

// Lazy load components with named exports for better debugging
const SideBar = lazy(() => import('../components/AdminSideBar/SideBar')
  .then(module => ({ default: module.SideBar })));

const Body = lazy(() => import('../components/AdminBodySection/Body')
  .then(module => ({ default: module.Body })));

// Enhanced Error Boundary with recovery option
class ErrorBoundary extends React.Component {
  state = { 
    hasError: false,
    error: null 
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component Error:', error, errorInfo);
    // Log to error tracking service
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback" role="alert">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message || 'Failed to load component'}</p>
          <button 
            onClick={this.handleRetry}
            className="retry-button"
            aria-label="Retry loading component"
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive sidebar handling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = useCallback(() => {
    if (!isMobile) {
      setSidebarCollapsed(prev => !prev);
    }
  }, [isMobile]);

  // Keyboard accessibility for sidebar toggle
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && !sidebarCollapsed) {
      setSidebarCollapsed(true);
    }
  }, [sidebarCollapsed]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Preloved</title>
        <meta name="description" content="Powerful admin dashboard to manage products, users, and settings for the Preloved platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <div 
        className={`admin-dashboard${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}
        data-theme="light" // Can be dynamic based on user preference
        role="main"
      >
        <ErrorBoundary>
          <aside
            className="sidebar"
            aria-label="Main navigation"
            aria-hidden={isMobile && sidebarCollapsed}
          >
            <Suspense fallback={
              <div className="loading-spinner" aria-live="polite" aria-busy="true">
                <span className="sr-only">Loading navigation...</span>
              </div>
            }>
              <SideBar 
                collapsed={sidebarCollapsed} 
                toggleSidebar={toggleSidebar} 
                isMobile={isMobile}
              />
            </Suspense>
          </aside>
        </ErrorBoundary>

        <ErrorBoundary>
          <main 
            className="main-content"
            id="main-content" 
            tabIndex="-1"
          >
            <Suspense fallback={
              <div className="loading-spinner" aria-live="polite" aria-busy="true">
                <span className="sr-only">Loading dashboard content...</span>
              </div>
            }>
              <Body 
                sidebarCollapsed={sidebarCollapsed}
                toggleSidebar={toggleSidebar}
              />
            </Suspense>
          </main>
        </ErrorBoundary>
      </div>
    </>
  );
};

AdminDashboard.propTypes = {
  // Add prop types validation if needed
};

export default memo(AdminDashboard);