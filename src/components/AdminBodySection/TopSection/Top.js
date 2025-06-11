import React, { useEffect, useState } from 'react';
import './Top.css';
import { Link } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../Firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Top = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const userDoc = doc(db, 'users', user.uid); 
        const userSnap = await getDoc(userDoc);

        if (userSnap.exists()) {
          setUserName(userSnap.data().name);
        } else {
          setUserName('User'); 
        }
      } else {
        setUserId(null);
        setUserName('');
      }
    });

    return () => unsubscribe(); 
  }, []);

    useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);


  return (
    <div className='top-section'>
      <div className='headerSection'>
        <div className='tittle'>
          <h1>WELCOME TO PRELOVED</h1>
          <p>Hello {userName ? userName : 'Guest'}, Welcome back!</p>
        </div>

        <div className='search-bar'>
          <input type='text' placeholder='Search for an Item or Product' />
        </div>

        <div className='dark-mode-bttn'>
          <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light" : "Dark"}
      </button>

        </div>

        <div className='nav-login-cart'>
          <Link to='/login'><button>Login</button></Link>

          {userId && (
            <Link to='/profile' className='profile-tab'>
              <img
                src=''
                alt=''
                className='profile-icon'
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Top;
