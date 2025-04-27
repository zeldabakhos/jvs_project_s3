import React from "react";
import { useCart } from "../context/CartContext";
import styled from "styled-components";

// Styled-components for cart page

const CartContainer = styled.div`
  max-width: 900px;
  margin: 4rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

const CartHeader = styled.h2`
  font-size: 2rem;
  color: #5d3a00;
  text-align: center;
  margin-bottom: 2rem;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
`;

const CartItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 1.5rem;
  border-radius: 10px;
`;

const CartItemInfo = styled.div`
  flex-grow: 1;
`;

const CartItemName = styled.h4`
  font-size: 1.2rem;
  color: #5d3a00;
  margin-bottom: 0.5rem;
`;

const CartItemPrice = styled.p`
  color: #8b5e3c;
  margin-bottom: 0.5rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  span {
    margin: 0 10px;
    font-size: 1.1rem;
  }
`;

const CartItemButton = styled.button`
  background-color: #8b5e3c;
  color: #fff;
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #a9745a;
    transform: translateY(-2px);
  }
`;

const RemoveButton = styled(CartItemButton)`
  background-color: #c04a4a;
  margin-top: 0.5rem;

  &:hover {
    background-color: #e25d5d;
  }
`;

const TotalPrice = styled.h3`
  text-align: right;
  margin-top: 2rem;
  color: #5d3a00;
`;

const PayButton = styled.button`
  display: block;
  margin: 2rem auto 0;
  background-color: #8b5e3c;
  color: #fff;
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #a9745a;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #c4b7a6;
    cursor: not-allowed;
  }
`;

const EmptyCart = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #8b5e3c;
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
  const { cartItems, increaseQuantity, decreaseQuantity, updateQuantity, notification, clearCart } =
    useCart();

  const handleIncrease = (_id, price) => {
    increaseQuantity(_id, price);
  };

  const handleDecrease = (_id, price) => {
    decreaseQuantity(_id, price);
  };

  const handleRemove = (_id, price) => {
    updateQuantity(_id, price, 0);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePayment = () => {
    clearCart();
    alert("Payment successful! Your cart is now empty.");
  };

  return (
    <CartContainer>
      {notification && <Notification>{notification}</Notification>}

      <CartHeader>Your Cart</CartHeader>

      {cartItems.length === 0 ? (
        <EmptyCart>Your cart is empty!</EmptyCart>
      ) : (
        cartItems.map((item) => (
          <CartItem key={item._id + item.price}>
            <CartItemImage src={item.imageUrl} alt={item.productName} />
            <CartItemInfo>
              <CartItemName>{item.productName}</CartItemName>
              <CartItemPrice>${item.price}</CartItemPrice>

              <QuantityControl>
                <CartItemButton onClick={() => handleDecrease(item._id, item.price)}>-</CartItemButton>
                <span>{item.quantity}</span>
                <CartItemButton onClick={() => handleIncrease(item._id, item.price)}>+</CartItemButton>
              </QuantityControl>

              <RemoveButton onClick={() => handleRemove(item._id, item.price)}>
                Remove
              </RemoveButton>
            </CartItemInfo>
          </CartItem>
        ))
      )}

      <TotalPrice>Total: ${totalPrice.toFixed(2)}</TotalPrice>

      <PayButton onClick={handlePayment} disabled={cartItems.length === 0}>
        Pay
      </PayButton>
    </CartContainer>
  );
};

export default CartPage;
