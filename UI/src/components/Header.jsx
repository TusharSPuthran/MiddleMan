import React from 'react';
import "../app.css"

const Header = () => {
  return (
    <header className="header">
      <div className="logo">VideoPlatform</div>
      <nav>
        <a href="/">Home</a>
        <a href="/upload">Upload</a>
        <a href="/review">Review</a>
      </nav>
      <div className="search">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
    </header>
  );
};

export default Header;
