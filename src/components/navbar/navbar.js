import React, { useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");

  return (
    <div className='navbar'>
<<<<<<< HEAD
      <ul className='nav-menu'>
        <li onClick={() => setMenu("Home")}>
          <Link style={{textDecoration:'none'}} to='/BuyerDashboard'>Home</Link> {menu === "Home" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Clothing_Accessories")}>
          <Link style={{textDecoration:'none'}} to='/Clothing_Accessories'>Clothing & Accessories</Link> {menu === "Clothing_Accessories" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Electronics_Gadgets")}>
          <Link style={{textDecoration:'none'}} to='/Electronics_Gadgets'>Electronics & Gadgets</Link> {menu === "Electronics_Gadgets" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Home_Living")}>
          <Link style={{textDecoration:'none'}} to='/Home_Living'>Home & Living</Link> {menu === "Home_Living" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Kids_Baby_Items")}>
          <Link style={{textDecoration:'none'}} to='/Kids_Baby_Items'>Kids & Baby Items</Link> {menu === "Kids_Baby_Items" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Vehicles_Automotive")}>
          <Link style={{textDecoration:'none'}} to='/Vehicles_Automotive'>Vehicles & Automotive</Link> {menu === "Vehicles_Automotive" ? <hr /> : null}
        </li>
      </ul>
=======
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
>>>>>>> a517e045b1014febe2067dce28d35ff7f2bbe603
    </div>
  );
};

export default Navbar;
