import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  return (
    <article className="col">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{product.productName}</h5>
          <p className="card-text">{product.description}</p>
          <p className="card-text">Price: ${product.price}</p>
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
