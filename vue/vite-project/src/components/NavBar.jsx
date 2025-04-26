import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo on the left */}
        <Link to="/" className="navbar-logo">My Bookstore</Link>

        {/* Pages aligned to the right */}
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" className="navbar-item">Home</Link></li>
          <li><Link to="/products" className="navbar-item">Products</Link></li>
          <li><Link to="/cart" className="navbar-item">Cart</Link></li>
          <li><Link to="/login" className="navbar-item">Login</Link></li>
          <li><Link to="/signup" className="navbar-item">Sign Up</Link></li>
        </ul>

        {/* Hamburger Menu */}
        <div className="navbar-hamburger" onClick={toggleMenu}>
          <span className="navbar-hamburger-line"></span>
          <span className="navbar-hamburger-line"></span>
          <span className="navbar-hamburger-line"></span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;