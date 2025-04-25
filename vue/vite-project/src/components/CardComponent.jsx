import React, { useState } from "react";
import styled from "styled-components";
import { useCart } from "../context/CartContext"; // Import the useCart hook

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

const Notification = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #28a745;
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  display: ${({ show }) => (show ? "block" : "none")};
  transition: opacity 0.5s ease;
`;

const CardComponent = ({ productName, price, imageUrl, productDescription, _id }) => {
  const [flipped, setFlipped] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useCart();

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleAddToCart = () => {
    const product = { _id, productName, price, imageUrl, productDescription };
    addToCart(product);

    // Show the notification
    setShowNotification(true);

    // Hide the notification after 2 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <CardContainer>
      <Notification show={showNotification}>Added to Cart!</Notification> {/* Notification */}
      <CardInner flipped={flipped}>
        <CardFront>
          <CardImage src={imageUrl} alt={productName} />
          <CardBody>
            <h5>{productName}</h5>
            <p>${price}</p>
            <Button onClick={handleFlip} className="btn btn-primary">View</Button>
          </CardBody>
        </CardFront>

        <CardBack>
          <div>
            <h5>{productName}</h5>
            <p>{productDescription}</p>
            <p><strong>Price:</strong> ${price}</p>
          </div>
          <Button onClick={handleAddToCart} className="btn btn-success">Add to Cart</Button> {/* Add to Cart button */}
          <Button onClick={handleFlip} className="btn btn-secondary">Back</Button>
        </CardBack>
      </CardInner>
    </CardContainer>
  );
};

export default CardComponent;
