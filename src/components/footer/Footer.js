import React from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const handleMessage = () =>{
        navigate('/message');
    }

  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-section about">
          <h2>PRELOVED</h2>
          <p>Buy, sell, and explore second-hand treasures safely with PreLoved.</p>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: support@preloved.com</p>
          <p>Phone: +64 123 456 789</p>
          <p>Location: Auckland, New Zealand</p>
        </div>

        <div className="footer-section help">
          <h3>Help & Support</h3>
          <p>If you're facing issues, please don't hesitate to reach out.</p>
          <button className="helpBtn" onClick={handleMessage}>Go to Help Center</button>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PreLoved. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
