import React, { useState, useEffect } from 'react';
import './navbar.css';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [menu, setMenu] = useState("");

  useEffect(() => {
    const path = location.pathname.split('/')[1]; // Get route segment
    setMenu(path || "Home");
  }, [location]);

  const links = [
    { name: "Home", path: "BuyerDashboard" },
    { name: "Clothing_Accessories", label: "Clothing & Accessories" },
    { name: "Electronics_Gadgets", label: "Electronics & Gadgets" },
    { name: "Home_Living", label: "Home & Living" },
    { name: "Kids_Baby_Items", label: "Kids & Baby Items" },
    { name: "Vehicles_Automotive", label: "Vehicles & Automotive" },
  ];

  return (
    <div className='navbar'>
      <div className='navbar-logo'>
        <p>PRELOVED APP</p>
      </div>

      <ul className='nav-menu'>
        {links.map(({ name, path, label }) => (
          <li key={name} onClick={() => setMenu(name)}>
            <Link style={{ textDecoration: 'none' }} to={`/${path || name}`}>
              {label || name.replace(/_/g, ' ')}
            </Link>
            {menu === name && <hr />}
          </li>
        ))}
      </ul>

      <div className='nav-login-cart'>
        <Link to='/login'>
          <button aria-label="Login Button">Login</button>
        </Link>
        <div className='nav-cart-count' aria-label="Cart count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
