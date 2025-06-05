import React from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className='logo'>
        <h1>PRELOVED</h1>
      </div>

      <div className='menu-container'>
        <h3>QUICK MENU</h3>
        <ul className='menuList'>
          <li className='itemList'><Link style={{textDecoration:'none'}} className='heading' to='/AdminDashboard'>DASHBOARD</Link></li>
          <li className='itemList'><Link style={{textDecoration:'none'}} className='heading' to='/AdminOrder'>ORDERS</Link></li>
          <li className='itemList'><Link style={{textDecoration:'none'}} className='heading' to='/Adminexplore'>EXPLORE</Link></li>
          <li className='itemList'><Link style={{textDecoration:'none'}} className='heading' to='/AddProduct'>PRODUCTS</Link></li>
        </ul>

        <h3>SETTINGS</h3>
        <ul className='menuList'>
          <li className='itemList'><Link style={{textDecoration:'none'}} className='heading' to='/Admincharts'>CHARTS</Link></li>
          <li className='itemList'><Link style={{textDecoration:'none'}} className='heading' to='/Admintrends'>TRENDS</Link></li>
          <li className='itemList'><Link style={{textDecoration:'none'}} className='heading' to='/Admincontact'>CONTACT</Link></li>
          <li className='itemList'><Link style={{textDecoration:'none'}} className='heading' to='/Adminbilling'>BILLING</Link></li>
        </ul>
      </div>

      <div className='helpCentre'>
        <h3>HELP CENTRE</h3>
        <p>Having trouble in <br />Preloved? Please <br />contact us.</p>
        <button className='helpBtn'>GO TO HELP</button>
      </div>
    </div>
  );
};

export default SideBar;
