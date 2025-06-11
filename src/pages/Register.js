import React, { useState } from 'react';
import { auth } from '../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './Register.css';
import { Link, useNavigate} from 'react-router-dom';
import { db } from '../Firebase';
import { doc, setDoc } from 'firebase/firestore';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [ID, setID] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate;

  const handleSignup = async (e) => {
  e.preventDefault();
  try {
    if (!file) {
      alert('Please upload your ID proof');
      return;
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      role,
      IDType: ID,
      IDFileName: file.name, 
      uid: user.uid,
      createdAt: new Date()
    });

    alert("User registered and data saved to Firestore!");
    navigate("./login")
  } catch (err) {
    console.error("Signup error:", err.message);
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

      <div className='register-role'>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value='' disabled>Select role</option>
              <option value='buyer'>Buyer</option>
              <option value='seller'>Seller</option>
            </select>
          </div>

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
