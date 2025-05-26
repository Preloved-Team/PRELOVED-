import React, { useState } from 'react';
import { auth } from '../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import RegisterStyle from './Register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ID, setID] = useState('');
  const [file, setFile] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (!file) {
        alert('Please upload your ID proof');
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      alert("User registered successfully!");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className='Register-container'>
      <h1>Signup Page</h1>

      <input
        type='text'
        placeholder='Enter Your Name'
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type='email'
        placeholder='Enter email'
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type='password'
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className='IDProof'>
        <select value={ID} onChange={(e) => setID(e.target.value)} required>
          <option value='' disabled>Select ID</option>
          <option value='Driving Licence'>Driving Licence</option>
          <option value='Passport'>Passport</option>
        </select>
      </div>

      {ID && (
        <div className='file-upload'>
          <label>
            Upload {ID}:
            <input
              type='file'
              accept='image/*,application/pdf'
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </label>
        </div>
      )}

      <div className='register-agree'>
            <input type='checkbox' id='agree' />
            <label htmlFor='agree'>
              Remember me
            </label>
          </div>

      <button type='submit'>Sign Up</button>
      <p className='Register-guide'>
            Already have an account? login <Link to='/Login'>here</Link>
          </p>
    </form>
  );
};

export default Register;
