import React from 'react'
import TopStyle from './Top.css';
import Login from '../../../pages/Login';
import { Link } from 'react-router-dom';

const Top = () => {
  return (
    <div className='top-section'>
      <div className='headerSection'>
        <div className='tittle'>
            <h1>WELCOME TO PRELOVED</h1>
            <p>hello Shubham, Welcome back!</p>
        </div>
        <div className='search-bar'>
            <input type='text'placeholder='Search Dashboard'/>
        </div>
        <div className='nav-login-cart'>
                <Link to='/Login'><button>Login</button></Link>
                <div className='nav-cart-count'>0</div>
              </div>
      </div>
    </div>

  )
}

export default Top
