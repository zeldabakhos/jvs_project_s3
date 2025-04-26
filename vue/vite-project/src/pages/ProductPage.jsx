import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../utils/fetchProducts.js';
import CardComponent from '../components/CardComponent.jsx';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/login");
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
      const response = await fetch(`http://localhost:3000/api/products/deleteProduct/${id}`, {
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
    <div>
      {/* Create Product Button */}
      <div className="col-12">
        <Link to="/createproduct" className="btn btn-primary mb-3">
          Create Product
        </Link>
      </div>

      {/* Display Products */}
      <section className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {products.map((product) => (
          <div key={product._id} className="col">
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

