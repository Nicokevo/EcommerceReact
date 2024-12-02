import { createContext, useContext, useState } from "react";
import Swal from 'sweetalert2';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item, quantity) => {
    const quantityNumber = Number(quantity);

    if (isNaN(quantityNumber) || quantityNumber <= 0) {
      console.error("Invalid quantity:", quantity);
      return;
    }

    const stock = Number(item.stock);
    if (isNaN(stock) || stock <= 0) {
      console.error("Invalid stock value:", item.stock);
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantityNumber;

        if (newQuantity > stock) {
          Swal.fire({
            title: 'Stock Limit Reached',
            text: `Only ${stock} units are available. Please adjust your quantity.`,
            icon: 'warning',
            confirmButtonText: 'Okay',
          });
          return prevCart;
        }

        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        );
      }

      return [...prevCart, { ...item, quantity: quantityNumber }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) => {
      const item = prevCart.find(cartItem => cartItem.id === id);
      if (!item) {
        console.error('Item not found');
        return prevCart;
      }

      const stock = Number(item.stock);
      if (isNaN(stock) || stock <= 0) {
        console.error("Invalid stock value:", item.stock);
        return prevCart;
      }

      if (newQuantity > stock) {
        Swal.fire({
          title: 'Stock Limit Reached',
          text: `Only ${stock} units are available. Please adjust your quantity.`,
          icon: 'warning',
          confirmButtonText: 'Okay',
        });
        return prevCart;
      }

      return prevCart.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity: newQuantity } : cartItem
      );
    });
  };

  const removeFromCart = (id, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.id === id);

      if (!existingItem) {
        console.error("Item not found in cart");
        return prevCart;
      }

      if (existingItem.quantity < quantity) {
        Swal.fire({
          title: 'Invalid Quantity',
          text: `You are trying to remove more units than are in your cart. You only have ${existingItem.quantity} units of this item.`,
          icon: 'error',
          confirmButtonText: 'Understood',
        });
        return prevCart;
      }

      if (existingItem.quantity > quantity) {
        return prevCart.map(cartItem =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - quantity }
            : cartItem
        );
      } else {
        return prevCart.filter(cartItem => cartItem.id !== id);
      }
    });
  };

  const getCartSize = () => {
    return cart.reduce((acc, item) => {
      if (typeof item.quantity !== 'number' || isNaN(item.quantity)) {
        console.error(`Invalid quantity for item with id ${item.id}: ${item.quantity}`);
        return acc;
      }
      return acc + item.quantity;
    }, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart,
      getCartSize,
      clearCart,
      updateQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};

// cartHooks.js

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
