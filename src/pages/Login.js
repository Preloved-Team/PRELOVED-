import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!checked) {
      setError('You must agree to the Terms of Use and Privacy Policy');
      return;
    }

    if (!role) {
      setError('Please select a role before continuing');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');
      
      // Redirect based on role
      const dashboardPaths = {
        buyer: '/BuyerDashboard',
        seller: '/SellerDashboard',
        admin: '/AdminDashboard'
      };
      
      navigate(dashboardPaths[role] || '/');

    } catch (err) {
      console.error('Login failed:', err.code);
      
      const errorMessages = {
        'auth/user-not-found': 'User does not exist. Please sign up first.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/invalid-email': 'Invalid email format.',
        'auth/too-many-requests': 'Account temporarily disabled due to too many failed attempts. Try again later or reset your password.'
      };

      setError(errorMessages[err.code] || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login'>
      <form className='login-container' onSubmit={handleSubmit}>
        <h1>Login Page</h1>
        
        {error && <div className='login-error'>{error}</div>}
        
        <div className='login-field'>
          <input 
            type='email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Enter your email' 
            required 
          />
          <input 
            type='password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Password' 
            required 
          />
        </div>
        
        <div className='login-role'>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value='' disabled>Select role</option>
            <option value='buyer'>Buyer</option>
            <option value='seller'>Seller</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
        
        <div className='login-agree'>
          <input 
            type='checkbox' 
            id='agree' 
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            required
          />
          <label htmlFor='agree'>
            By continuing, I agree to the Terms of Use and Privacy Policy.
          </label>
        </div>
        
        <button type='submit' disabled={loading}>
          {loading ? 'Logging in...' : 'Continue'}
        </button>
        
        <p className='login-guide'>
          Don't have an account? Sign up <Link to='/Register'>here</Link>
        </p>
        
        <p className='forgot-password'>
          <Link to='/ResetPassword'>Forgot password?</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;