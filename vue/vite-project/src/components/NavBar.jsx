import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/cart">Cart</Link></li> {/* Add cart link */}
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
