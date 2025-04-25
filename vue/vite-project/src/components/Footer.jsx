import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  const isLoggedIn = localStorage.getItem("token");  // Check if user is logged in (you can also use state/context)

  return (
    <footer className="py-3 bg-light mt-auto">
      <ul className="nav justify-content-center pb-3">
        {isLoggedIn && (
          <li className="nav-item">
            <Link to="/products" className="nav-link px-2">
              Products
            </Link>
          </li>
        )}
        {!isLoggedIn ? (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link px-2">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link px-2">
                Sign-up
              </Link>
            </li>
          </>
        ) : (
          <li className="nav-item">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();  // Optional: Reload page to update the UI after logout
              }}
              className="nav-link px-2 btn btn-link"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </footer>
  );
};

export default Footer;
