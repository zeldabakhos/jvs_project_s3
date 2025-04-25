import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState("");

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(
        (item) => item._id === product._id && item.price === product.price
      );
      
      if (existing) {
        return prevItems.map((item) =>
          item._id === product._id && item.price === product.price
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    // Show notification after adding the item
    setNotification(`${product.productName} added to cart!`);
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const increaseQuantity = (_id, price) => {
    setCartItems((items) =>
      items.map((item) =>
        item._id === _id && item.price === price
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (_id, price) => {
    setCartItems((items) =>
      items.map((item) =>
        item._id === _id && item.price === price && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Update quantity function, used to remove an item by setting quantity to 0
  const updateQuantity = (_id, price, quantity) => {
    setCartItems((items) =>
      items.map((item) =>
        item._id === _id && item.price === price
          ? { ...item, quantity: quantity }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,  // Exposing the updateQuantity function
        clearCart,
        notification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
