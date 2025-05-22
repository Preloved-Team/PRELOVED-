import React from 'react'
import './SideBar.css';

const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className='logo'>
        <h1>PRELOVED</h1>
      </div>

      <div className='menu-container'>
        <h3>QUICK MENU</h3>
        <ul className='menuList'>
          <li className='itemList'><span className='heading'>DASHBOARD</span></li>
          <li className='itemList'><span className='heading'>ORDERS</span></li>
          <li className='itemList'><span className='heading'>EXPLORE</span></li>
          <li className='itemList'><span className='heading'>PRODUCTS</span></li>
        </ul>

        <h3>SETTINGS</h3>
        <ul className='menuList'>
          <li className='itemList'><span className='heading'>CHARTS</span></li>
          <li className='itemList'><span className='heading'>TRENDS</span></li>
          <li className='itemList'><span className='heading'>CONTACT</span></li>
          <li className='itemList'><span className='heading'>BILLING</span></li>
        </ul>
      </div>

      <div className='helpCentre'>
        <h3>HELP CENTRE</h3>
        <p>Having trouble in <br />Preloved? Please <br />contact us.</p>
        <button className='helpBtn'>GO TO HELP</button>
      </div>
    </div>
  )
}

export default SideBar
