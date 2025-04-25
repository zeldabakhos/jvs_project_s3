import React from "react";
import { useCart } from "../context/CartContext";
import styled from "styled-components";

// Styled-components for cart item layout
const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const CartItemImage = styled.img`
  margin-right: 1rem;
`;

const CartItemInfo = styled.div`
  flex-grow: 1;
`;

const CartItemButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Notification = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  z-index: 999;
`;

const CartPage = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, updateQuantity, notification } =
    useCart();

  const handleIncrease = (_id, price) => {
    increaseQuantity(_id, price);
  };

  const handleDecrease = (_id, price) => {
    decreaseQuantity(_id, price);
  };

  const handleRemove = (_id, price) => {
    updateQuantity(_id, price, 0);  // Set quantity to 0 to remove the item
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      {notification && <Notification>{notification}</Notification>} {/* Show notification */}

      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        cartItems.map((item) => (
          <CartItem key={item._id + item.price}>
            <CartItemImage src={item.imageUrl} alt={item.productName} width="100" />
            <CartItemInfo>
              <h4>{item.productName}</h4>
              <p>${item.price}</p>

              <div>
                <CartItemButton onClick={() => handleDecrease(item._id, item.price)}>-</CartItemButton>
                <span>{item.quantity}</span>
                <CartItemButton onClick={() => handleIncrease(item._id, item.price)}>+</CartItemButton>
              </div>

              <CartItemButton onClick={() => handleRemove(item._id, item.price)}>Remove</CartItemButton>
            </CartItemInfo>
          </CartItem>
        ))
      )}

      <h3>Total: ${totalPrice}</h3>
    </div>
  );
};

export default CartPage;
