import React, { useState } from 'react';
<<<<<<< HEAD
import { Link, useNavigate } from 'react-router-dom';
=======
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
>>>>>>> 305074c (updated files after fixing crash in cart.)
import './Login.css';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

<<<<<<< HEAD
=======
  const handleContinue = () => {
<<<<<<< HEAD
    console.log('Selected role:', role); // Debug log
=======
    console.log('Selected role:', role); 
>>>>>>> 3b7195c (The Work done in Week3 by Arsh.)
=======
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

>>>>>>> 305074c (updated files after fixing crash in cart.)
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('Login successful');
    
    if (!role) {
      alert('Please select a role before continuing');
      return;
    }
<<<<<<< HEAD
=======
>>>>>>> 9fe7257 (updated files after fixing crash in cart.)
>>>>>>> 305074c (updated files after fixing crash in cart.)

    if (role === 'buyer') {
      navigate('/BuyerDashboard');
    } else if (role === 'seller') {
      navigate('/SellerDashboard');
    } else if (role === 'admin') {
      navigate('/AdminDashboard');
<<<<<<< HEAD
    }
=======
<<<<<<< HEAD
    } else {
      alert('Please select a role before continuing');
    }
  };
=======
    }
>>>>>>> 305074c (updated files after fixing crash in cart.)

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
<<<<<<< HEAD
=======
>>>>>>> 9fe7257 (updated files after fixing crash in cart.)
>>>>>>> 305074c (updated files after fixing crash in cart.)

  return (
    <div>
      <div className='login'>
<<<<<<< HEAD
        <form className='login-container' onSubmit={handleSubmit}>
          <h1>Login Page</h1>
          <div className='login-field'>
=======
<<<<<<< HEAD
        <div className='login-container'>
          <h1>Login Page</h1>
          <div className='login-field'>
<<<<<<< HEAD
            <input type='email' placeholder='Enter your email' />
            <input type='password' placeholder='Password' />
=======
            <input type='email' placeholder='Enter your email' required/>
            <input type='password' placeholder='Password' required/>
>>>>>>> 3b7195c (The Work done in Week3 by Arsh.)
=======
        <form className='login-container' onSubmit={handleSubmit}>
          <h1>Login Page</h1>
          <div className='login-field'>
>>>>>>> 305074c (updated files after fixing crash in cart.)
            <input type='email' 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Enter your email' 
            required />
            <input type='password' 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Password' 
            required />
<<<<<<< HEAD
=======
>>>>>>> 9fe7257 (updated files after fixing crash in cart.)
>>>>>>> 305074c (updated files after fixing crash in cart.)
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
<<<<<<< HEAD
          <button type='submit'>Continue</button>
=======
<<<<<<< HEAD
          <button onClick={handleContinue}>Continue</button>
>>>>>>> 305074c (updated files after fixing crash in cart.)
          <p className='login-guide'>
            Don't have an account? Sign up <Link to='/Register'>here</Link>
          </p>
<<<<<<< HEAD
=======
        </div>
=======
          <button type='submit'>Continue</button>
          <p className='login-guide'>
            Don't have an account? Sign up <Link to='/Register'>here</Link>
          </p>
>>>>>>> 305074c (updated files after fixing crash in cart.)
          <p className='forgot-password'>
            <Link to='/ResetPassword'>Forgot password ?</Link>
          </p>
        </form>
<<<<<<< HEAD
=======
>>>>>>> 9fe7257 (updated files after fixing crash in cart.)
>>>>>>> 305074c (updated files after fixing crash in cart.)
      </div>
    </div>
  );
};

export default Login;
