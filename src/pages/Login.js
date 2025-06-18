import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../Firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await redirectUser(userCredential.user.uid);
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. ' + (err.message || 'Please try again.'));
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: userCredential.user.email,
          name: userCredential.user.displayName,
          role: 'buyer', 
          createdAt: new Date()
        });
      }
      
      await redirectUser(userCredential.user.uid);
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError('Google sign-in failed. ' + (err.message || 'Please try again.'));
    }
  };

  const redirectUser = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      const userData = userDoc.data();

      if (!userData || !userData.role) {
        throw new Error('User role not found.');
      }

      const role = userData.role;
      if (role === 'buyer') {
        navigate('/BuyerDashboard');
      } else if (role === 'seller') {
        navigate('/sellerDashboard');
      } else if (role === 'admin') {
        navigate('/adminDashboard');
      } else {
        throw new Error('Unrecognized role.');
      }
    } catch (err) {
      console.error('Redirect error:', err);
      setError('Error redirecting. ' + (err.message || 'Please try again.'));
    }
  };

  return (
    <div>
      <div className='login'>
        <form className='login-container' onSubmit={handleSubmit}>
          <h1>Login Page</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className='login-field'>
            <input type='email' 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Enter your email' 
            required />
            <input type='password' 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Password' 
            required />
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
            <Link to='/ResetPassword'>Forgot password ?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;