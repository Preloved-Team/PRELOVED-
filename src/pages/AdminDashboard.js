import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import SideBar from '../components/AdminSideBar/SideBar';
import Body from '../components/AdminBodySection/Body';
import './AdminDashboard.css';

const AdminDashboard = () => {
  useEffect(() => {
    // Example: Track page view or initialize something
    console.log('AdminDashboard mounted');
  }, []);

  return (
    <div className="container" role="main">
      <aside className="sidebar" aria-label="Admin navigation sidebar">
        <SideBar />
      </aside>
      <main className="body" tabIndex={-1}>
        <Body />
      </main>
    </div>
  );
};

AdminDashboard.propTypes = {
  // If props are added in the future, define their types here
};

export default memo(AdminDashboard);
