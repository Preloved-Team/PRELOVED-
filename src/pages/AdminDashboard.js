<<<<<<< HEAD
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
=======
import React from 'react'

const AdminDashboard = () => {
  return (
    <div>
      <h1>admin page</h1>
    </div>
  )
}

export default AdminDashboard
>>>>>>> a517e045b1014febe2067dce28d35ff7f2bbe603
