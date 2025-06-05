import React from 'react';
import SideBar from '../components/AdminSideBar/SideBar';
import Body from '../components/AdminBodySection/Body';
import './AdminDashboard.css'; // Add this import

const AdminDashboard = () => {
  return (
    <div className='container'>
      <div className='sidebar'>
        <SideBar />
      </div>
      <div className='body'>
        <Body />
      </div>
    </div>
  );
};

export default AdminDashboard;
