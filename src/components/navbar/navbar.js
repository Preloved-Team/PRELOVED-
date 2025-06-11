import React, { useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");

  return (
    <div className='navbar'>
      <ul className='nav-menu'>
        <li onClick={() => setMenu("Home")}>
          <Link style={{ textDecoration: 'none' }} to='/BuyerDashboard'>
            Home
          </Link>
          {menu === "Home" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Clothing_Accessories")}>
          <Link style={{ textDecoration: 'none' }} to='/Clothing_Accessories'>
            Clothing & Accessories
          </Link>
          {menu === "Clothing_Accessories" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Electronics_Gadgets")}>
          <Link style={{ textDecoration: 'none' }} to='/Electronics_Gadgets'>
            Electronics & Gadgets
          </Link>
          {menu === "Electronics_Gadgets" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Home_Living")}>
          <Link style={{ textDecoration: 'none' }} to='/Home_Living'>
            Home & Living
          </Link>
          {menu === "Home_Living" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Kids_Baby_Items")}>
          <Link style={{ textDecoration: 'none' }} to='/Kids_Baby_Items'>
            Kids & Baby Items
          </Link>
          {menu === "Kids_Baby_Items" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Vehicles_Automotive")}>
          <Link style={{ textDecoration: 'none' }} to='/Vehicles_Automotive'>
            Vehicles & Automotive
          </Link>
          {menu === "Vehicles_Automotive" ? <hr /> : null}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
