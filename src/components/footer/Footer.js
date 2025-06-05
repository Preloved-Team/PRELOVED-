import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <section className="footer-section about">
          <h2>PRELOVED</h2>
          <p>Buy, sell, and explore second-hand treasures safely with PreLoved.</p>
        </section>

        <section className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:support@preloved.com">support@preloved.com</a></p>
          <p>Phone: <a href="tel:+64123456789">+64 123 456 789</a></p>
          <p>Location: Auckland, New Zealand</p>
        </section>

        <section className="footer-section help">
          <h3>Help & Support</h3>
          <p>If you're facing issues, please don't hesitate to reach out.</p>
          <button className="helpBtn" onClick={() => window.location.href = "/help"}>
            Go to Help Center
          </button>
        </section>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PreLoved. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
