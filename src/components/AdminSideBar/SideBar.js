import React from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className='logo'>
        <h1>PRELOVED</h1>
      </div>

      <div className='menu-container-seller'>
        <h3>QUICK MENU</h3>
        <ul className='menuList'>
          <li className='itemList1'><Link style={{textDecoration:'none'}} className='headingSeller' to='/AdminDashboard'>DASHBOARD</Link></li>
          <li className='itemList1'><Link style={{textDecoration:'none'}} className='headingSeller' to='/AdminOrder'>ORDERS</Link></li>
          <li className='itemList1'><Link style={{textDecoration:'none'}} className='headingSeller' to='/adminpermissions'>PERMISSIONS</Link></li>
          <li className='itemList1'><Link style={{textDecoration:'none'}} className='headingSeller' to='/AddProduct'>PRODUCTS</Link></li>
        </ul>

        <h3>SETTINGS</h3>
        <ul className='menuList'>
          <li className='itemList1'><Link style={{textDecoration:'none'}} className='headingSeller' to='/AdminEarning'>EARNING</Link></li>
          <li className='itemList1'><Link style={{textDecoration:'none'}} className='headingSeller' to='/feedback'>FEEDBACK</Link></li>
          <li className='itemList1'><Link style={{textDecoration:'none'}} className='headingSeller' to='/profitChart'>CHARTS</Link></li>
          <li className='itemList1'><Link style={{textDecoration:'none'}} className='headingSeller' to='/notifications'>NOTIFICATIONS</Link></li>
        </ul>
      </div>

      <div className='helpCentre'>
        <h3>HELP CENTRE</h3>
        <p>Having trouble in <br />Preloved? Please <br />contact us.</p>
        <button className='helpButton'>GO TO HELP</button>
      </div>
    </div>
  );
};

export default SideBar;
