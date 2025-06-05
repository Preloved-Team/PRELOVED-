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
          <li className='itemList'><Link className='heading' to='/AdminDashboard'>Dashboard</Link></li>
          <li className='itemList'><Link className='heading' to='/AdminOrder'>Orders</Link></li>
          <li className='itemList'><Link className='heading' to='/Adminexplore'>Explore</Link></li>
          <li className='itemList'><Link className='heading' to='/AddProduct'>Products</Link></li>
        </ul>

        <h3>SETTINGS</h3>
        <ul className='menuList'>
          <li className='itemList'><Link className='heading' to='/Admincharts'>Charts</Link></li>
          <li className='itemList'><Link className='heading' to='/Admintrends'>Trends</Link></li>
          <li className='itemList'><Link className='heading' to='/Admincontact'>Contact</Link></li>
          <li className='itemList'><Link className='heading' to='/Adminbilling'>Billing</Link></li>
        </ul>
      </div>

      <div className='helpCentre'>
        <h3>HELP CENTRE</h3>
        <p>Having trouble in <br />Preloved? Please <br />contact us.</p>
        <button className='helpBtn'>Go to Help</button>
      </div>
    </div>
  );
};

export default SideBar;
