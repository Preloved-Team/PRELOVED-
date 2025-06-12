import React from 'react';
import SideBar from '../components/AdminSideBar/SideBar';
import Body from '../components/AdminBodySection/Body';
import './AdminDashboard.css'; // Import updated styles

const AdminDashboard = () => {
  return (
    <div className="container">
      <aside className="sidebar">
        <SideBar />
      </aside>
      <main className="body">
        <Body />
      </main>
    </div>
  );
};

export default AdminDashboard;
