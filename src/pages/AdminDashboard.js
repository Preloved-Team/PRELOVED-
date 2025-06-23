import React from 'react';
import SideBar from '../components/AdminSideBar/SideBar';
import Body from '../components/AdminBodySection/Body';
import './AdminDashboard.css'; 

const AdminDashboard = () => {
  return (
    <div>
      <div className='container'>
      <div className='sidebar'>
        <SideBar />
      </div>
      <div className='body'>
        <Body />
        <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PreLoved. All rights reserved.</p>
      </div>
      </div>
    </div>
      
    </div>
  );
};

export default AdminDashboard;
