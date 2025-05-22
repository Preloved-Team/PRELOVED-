import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    console.log('Selected role:', role); 

    if (role === 'buyer') {
      navigate('/BuyerDashboard');
    } else if (role === 'seller') {
      navigate('/SellerDashboard');
    } else if (role === 'admin') {
      navigate('/AdminDashboard');
    } else {
      alert('Please select a role before continuing');
    }
  };

  return (
    <div>
      <div className='login'>
        <div className='login-container'>
          <h1>Login Page</h1>
          <div className='login-field'>
            <input type='email' placeholder='Enter your email' required/>
            <input type='password' placeholder='Password' required/>
          </div>
          <div className='login-role'>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value='' disabled>Select role</option>
              <option value='buyer'>Buyer</option>
              <option value='seller'>Seller</option>
              <option value='admin'>Admin</option>
            </select>
          </div>
          <div className='login-agree'>
            <input type='checkbox' id='agree' />
            <label htmlFor='agree'>
              By continuing, I agree to the Terms of Use and Privacy.
            </label>
          </div>
          <button onClick={handleContinue}>Continue</button>
          <p className='login-guide'>
            Don't have an account? Sign up <span>here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
