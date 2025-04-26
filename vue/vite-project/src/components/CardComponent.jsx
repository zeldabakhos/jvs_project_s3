import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext'; // Assuming CartContext is in the context folder
import { useDelete } from '../context/ProductContext';

// Styled-components for the card layout
const CardContainer = styled.div`
  perspective: 1000px;
  width: 300px;
  height: 400px;
  margin: 1rem;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${props => (props.flipped ? 'rotateY(180deg)' : 'none')};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border: 1px solid #ccc;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardFront = styled(CardFace)`
  z-index: 2;
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  padding: 1rem;
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 1rem;
`;

const Button = styled.button`
  margin-top: 10px;
`;

// Card Component
const CardComponent = ({ _id, productName, price, imageUrl, productDescription, onDelete }) => {
  const [flipped, setFlipped] = useState(false);
  const [showNotification, setNotification] = useState(false);
  const { addToCart } = useCart(); // Getting addToCart function from context
  const { deleteProduct } = useDelete();
  // Flip the card
  const handleFlip = () => {
    setFlipped(!flipped);
  };

  // Add product to cart and show notification
  const handleAddToCart = () => {
    const product = { productName, price, imageUrl, productDescription };
    addToCart(product); // Adds product to the cart context
    setNotification(true);
    setTimeout(() => setNotification(false), 2000); // Hide notification after 2 seconds
  };

  const handleDeleteClick = () => {
    if (deleteProduct) {
      deleteProduct(_id); 
    }
  };

  return (
    <CardContainer>
      {/* Notification for adding to cart */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#28a745',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '16px',
          display: showNotification ? 'block' : 'none',
        }}
      >
        Added to Cart!
      </div>

      <CardInner flipped={flipped}>
        {/* Front of the card */}
        <CardFront>
          <CardImage src={imageUrl} alt={productName} />
          <CardBody>
            <h5>{productName}</h5>
            <p>${price}</p>
            <Button onClick={handleFlip}>View</Button>
          </CardBody>
        </CardFront>

        {/* Back of the card */}
        <CardBack>
          <div>
            <h5>{productName}</h5>
            <p>{productDescription}</p>
            <p>
              <strong>Price:</strong> ${price}
            </p>
          </div>
          <div>
            <Button onClick={handleAddToCart} className="btn btn-success">
              Add to Cart
            </Button>
            <Button onClick={handleDeleteClick} className="btn btn-danger">
              Delete
            </Button>
            <Button onClick={handleFlip} className="btn btn-secondary">
              Back
            </Button>
          </div>
        </CardBack>
      </CardInner>
    </CardContainer>
  );
};

export default CardComponent;
