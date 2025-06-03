import React from 'react';
import SideBar from '../components/AdminSideBar/SideBar';
import Body from '../components/AdminBodySection/Body';
<<<<<<< HEAD
import './AdminDashboard.css'; 
=======
import './AdminDashboard.css'; // Add this import
>>>>>>> 68a673ce7b7fbd8eaa71e1f8244373c5a6d8edf5
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
