import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext'; // Assuming CartContext is in the context folder
import { useDelete } from '../context/ProductContext';
import { Link } from 'react-router-dom';

// Styled-components for the card layout
const CardContainer = styled.div`
  perspective: 1000px;
  width: 250px;
  height: 500px;
  margin: 1rem;
  position: relative;
  overflow: hidden;
`;

const CardInner = styled.div`
  position: relative;
  width: 90%;
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
  background-color: #fef8f1;
  overflow-y: auto; /* Make the back scrollable */
`;

const CardImage = styled.img`
  width: 80%;
  height: 50vh;  
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1rem;
`;

const Button = styled.button`
  background-color: #8b5c2c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  flex: 1 1 100%;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }

  &.delete:hover {
    background-color: #d9534f;
  }

  &.edit:hover {
    background-color: #f0ad4e;
  }

  &.add-to-cart:hover {
    background-color: #28a745;
  }
`;

const CardComponent = ({ _id, productName, price, imageUrl, productDescription, onDelete }) => {
  const [flipped, setFlipped] = useState(false);
  const [showAddNotification, setAddNotification] = useState(false);
  const [showDeleteNotification, setDeleteNotification] = useState(false);
  const { addToCart } = useCart(); // Getting addToCart function from context
  const { deleteProduct, editProduct } = useDelete();

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleAddToCart = () => {
    const product = { productName, price, imageUrl, productDescription };
    addToCart(product); // Adds product to the cart context
    setAddNotification(true);
    setTimeout(() => setAddNotification(false), 2000); // Hide notification after 2 seconds
  };

  const handleEditClick = () => {
    const updatedName = prompt("Enter new product name:", productName);
    if (updatedName !== null) {
      editProduct(_id, { productName: updatedName });
    }
  };

  const handleDeleteClick = () => {
    if (deleteProduct) {
      deleteProduct(_id); // Delete product
      setDeleteNotification(true); // Show delete notification
      setTimeout(() => setDeleteNotification(false), 2000); // Hide notification after 2 seconds
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
          display: showAddNotification ? 'block' : 'none',
          zIndex: 5,
        }}
      >
        Added to Cart!
      </div>

      {/* Notification for delete */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#d9534f', // Red for delete notification
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '16px',
          display: showDeleteNotification ? 'block' : 'none',
          zIndex: 5,
        }}
      >
        Deleted! Please refresh the page.
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
          <ButtonGroup>
            <Link to={`/editproduct/${_id}`}>
              <Button className="edit">Edit</Button>
            </Link>
            <Button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</Button>
            <Button className="delete" onClick={handleDeleteClick}>Delete</Button>
            <Button onClick={handleFlip}>Back</Button>
          </ButtonGroup>
        </CardBack>
      </CardInner>
    </CardContainer>
  );
};

export default CardComponent;
