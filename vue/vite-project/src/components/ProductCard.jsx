import React from 'react';

const ProductCard = ({ product, addToCart, onDelete }) => {
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      onDelete(product.id); // Call the delete function passed down as a prop
    }
  };

  return (
    <article className="col">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{product.productName}</h5>
          <p className="card-text">{product.description}</p>
          <p className="card-text">Price: ${product.price}</p>
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product.id)} // Add to cart functionality
          >
            Add to Cart
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDelete} // Delete functionality
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
