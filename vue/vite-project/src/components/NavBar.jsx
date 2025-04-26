import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);  // Update the state in App.js to reflect the logout
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">My Bookstore</Link>

        {/* Menu */}
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" className="navbar-item">Home</Link></li>
          
          {/* Conditionally render based on isLoggedIn */}
          {isLoggedIn ? (
            <>
              <li><Link to="/products" className="navbar-item">Products</Link></li>
              <li><Link to="/cart" className="navbar-item">Cart</Link></li>
              <li>
                <button onClick={handleLogout} className="navbar-item btn btn-link" style={{ padding: 0 }}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="navbar-item">Login</Link></li>
              <li><Link to="/signup" className="navbar-item">Sign Up</Link></li>
            </>
          )}
        </ul>

        {/* Hamburger */}
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
