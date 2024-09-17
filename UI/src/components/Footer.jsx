import React from 'react';
import "../app.css"

const Footer = () => {
  return (
    <footer className="footer">
      <h3>Video Collaboration Platform</h3>
      <p>&copy; 2024 VideoPlatform. All rights reserved.</p>
      <p>
        <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
      </p>
      <div className="socials">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
