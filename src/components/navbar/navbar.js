import React, { useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");

  return (
    <div className='navbar'>
      <div className='navbar-logo'>
        <p>PRELOVED APP</p>
      </div>
      <ul className='nav-menu'>
        <li onClick={() => setMenu("Home")}>
          <Link style={{ textDecoration: 'none' }} to='/BuyerDashboard'>Home</Link>
          {menu === "Home" && <hr />}
        </li>
        <li onClick={() => setMenu("Clothing_Accessories")}>
          <Link style={{ textDecoration: 'none' }} to='/Clothing_Accessories'>Clothing & Accessories</Link>
          {menu === "Clothing_Accessories" && <hr />}
        </li>
        <li onClick={() => setMenu("Electronics_Gadgets")}>
          <Link style={{ textDecoration: 'none' }} to='/Electronics_Gadgets'>Electronics & Gadgets</Link>
          {menu === "Electronics_Gadgets" && <hr />}
        </li>
        <li onClick={() => setMenu("Home_Living")}>
          <Link style={{ textDecoration: 'none' }} to='/Home_Living'>Home & Living</Link>
          {menu === "Home_Living" && <hr />}
        </li>
        <li onClick={() => setMenu("Kids_Baby_Items")}>
          <Link style={{ textDecoration: 'none' }} to='/Kids_Baby_Items'>Kids & Baby Items</Link>
          {menu === "Kids_Baby_Items" && <hr />}
        </li>
        <li onClick={() => setMenu("Vehicles_Automotive")}>
          <Link style={{ textDecoration: 'none' }} to='/Vehicles_Automotive'>Vehicles & Automotive</Link>
          {menu === "Vehicles_Automotive" && <hr />}
        </li>
      </ul>
      <div className='nav-login-cart'>
        <Link to='/login'><button>Login</button></Link>
        <div className='nav-cart-count'>0</div>
      </div>
    </div>
  );
};

export default Navbar;
