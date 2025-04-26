import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaBook } from 'react-icons/fa'; 
import './NavBar.css';

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);  
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">My Bookstore</Link>

        {/* Menu */}
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" className="navbar-item">
              <FaHome style={{ marginRight: '5px' }} /> Home
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link to="/products" className="navbar-item">
                  <FaBook style={{ marginRight: '5px' }} /> Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="navbar-item">
                  <FaShoppingCart style={{ marginRight: '5px' }} /> Cart
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="navbar-item btn btn-link" style={{ padding: 0 }}>
                  <FaSignOutAlt style={{ marginRight: '5px' }} /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="navbar-item">
                  <FaSignInAlt style={{ marginRight: '5px' }} /> Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="navbar-item">
                  <FaUserPlus style={{ marginRight: '5px' }} /> Sign Up
                </Link>
              </li>
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
