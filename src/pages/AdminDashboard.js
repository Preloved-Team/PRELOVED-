import React from 'react';
import SideBar from '../components/AdminSideBar/SideBar';
import Body from '../components/AdminBodySection/Body';
import './AdminDashboard.css'; 
import Footer from '../components/footer/Footer';

const AdminDashboard = () => {
  return (
    <div>
      <div className='container'>
      <div className='sidebar'>
        <SideBar />
      </div>
      <div className='body'>
        <Body />
        <Footer/>
      </div>
    </div>
      <div className='footer'>
        
      </div>
    </div>
  );
};

export default AdminDashboard;
