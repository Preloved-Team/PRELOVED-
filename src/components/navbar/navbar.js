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
        <li onClick={() => setMenu("Clothing & Accessories")}>
          <Link style={{textDecoration:'none'}} to='/BuyerDashboard/Clothing & Accessories'>Clothing & Accessories</Link> {menu === "Clothing & Accessories" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Electronics & Gadgets")}>
          <Link style={{textDecoration:'none'}} to='/BuyerDashboard/Electronics & Gadgets'>Electronics & Gadgets</Link> {menu === "Electronics & Gadgets" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Home & Living")}>
          <Link style={{textDecoration:'none'}} to='/BuyerDashboard/Home & Living'>Home & Living</Link> {menu === "Home & Living" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Kids & Baby Items")}>
          <Link style={{textDecoration:'none'}} to='/BuyerDashboard/Kids & Baby Items'>Kids & Baby Items</Link> {menu === "Kids & Baby Items" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Vehicles & Automotive")}>
          <Link style={{textDecoration:'none'}} to='/BuyerDashboard/Vehicles & Automotive'>Vehicles & Automotive</Link> {menu === "Vehicles & Automotive" ? <hr /> : null}
        </li>
      </ul>
      <div className='nav-login-cart'>
        <Link to='Login'><button>Login</button></Link>
        <div className='nav-cart-count'>0</div>
      </div>
    </div>
  );
};

export default Navbar;
