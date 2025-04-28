import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; 

const HomePage = () => {
  useEffect(() => {
    // Remove the token from localStorage when the HomePage is rendered
    localStorage.removeItem("token");
    console.log("Token removed:", localStorage.getItem("token")); // Optional: to check if it's really removed
  }, []); // Empty dependency array means it runs only once after the first render

  return (
    <div className="homepage">
      <h1 className="homepage-title">Welcome to My Bookstore</h1>
      <p className="homepage-description">
        Discover a world of books and knowledge. Explore our products, or log in to get started!
      </p>
      <div className="homepage-links">
        <Link to="/products" className="btn btn-primary">Browse Products</Link>
      </div>
    </div>
  );
};

export default HomePage;
