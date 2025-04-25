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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!products || products.length === 0) return <p>No products found</p>;

  return (
    <section className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      {products.map((product) => (
        <CardComponent
        key={product._id}
        productName={product.productName}
        productDescription={product.productDescription}
        price={product.price}
        imageUrl={product.imageUrl}
      />
      
      ))}
    </section>
  );
};

export default ProductPage;
