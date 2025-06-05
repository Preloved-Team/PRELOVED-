import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');

      if (!role) {
        alert('Please select a role before continuing');
        return;
      }

      if (role === 'buyer') {
        navigate('/BuyerDashboard');
      } else if (role === 'seller') {
        navigate('/SellerDashboard');
      } else if (role === 'admin') {
        navigate('/AdminDashboard');
      }

    } catch (err) {
      console.error('Login failed:', err.code);

      if (err.code === 'auth/user-not-found') {
        alert('User does not exist. Please sign up first.');
      } else if (err.code === 'auth/wrong-password') {
        alert('Incorrect password. Please try again.');
      } else if (err.code === 'auth/invalid-email') {
        alert('Invalid email format.');
      } else {
        alert('Login failed. Please try again.');
      }
    }
  };

  return (
    <div>
      <div className='login'>
        <form className='login-container' onSubmit={handleSubmit}>
          <h1>Login Page</h1>
          <div className='login-field'>
            <input
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              required
            />
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            />
          </div>

          <div className='login-role'>
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
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

          <button type='submit'>Continue</button>

          <p className='login-guide'>
            Don't have an account? Sign up <Link to='/Register'>here</Link>
          </p>
          <p className='forgot-password'>
            <Link to='/ResetPassword'>Forgot password?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
