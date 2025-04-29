import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../utils/fetchProducts.js';
import CardComponent from '../components/CardComponent.jsx';
import { Link } from 'react-router-dom';
import './ProductPage.css';
import.meta.env.VITE_API_URL

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if not logged in
    }
      const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (data) {
          setProducts(data);
        } else {
          setError("No products found.");
        }
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/deleteProduct/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        alert('Product deleted!');
        setProducts(products.filter((p) => p._id !== id)); // Update state to remove the product from the UI
      } else {
        const error = await response.json();
        alert(`Error deleting product: ${error.message}`);
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!products || products.length === 0) return <p>No products found</p>;

  return (
    <div className="page-container">
  <div className="col-12">
    <Link to="/createproduct" className="create-button">
      Create Product
    </Link>
  </div>

  <section className="products-grid">
    {products.map((product) => (
      <div key={product._id} className="card">
        <CardComponent
          productName={product.productName}
          productDescription={product.productDescription}
          price={product.price}
          imageUrl={product.imageUrl}
          _id={product._id}
        />
      </div>
    ))}
  </section>
</div>
  );
};

export default ProductPage;
