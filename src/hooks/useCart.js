import { useState, useEffect } from 'react';

const useCart = () => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, stock) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        // Verifica que la cantidad total no exceda el stock
        if (existingProduct.quantity < stock) {
          return prevCart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          console.warn('No puedes agregar más de este producto, stock limitado.');
          return prevCart; // No se agrega nada si se supera el stock
        }
      }
      // Si no existe, agregarlo con cantidad 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === productId);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          // Si la cantidad es mayor a 1, disminuir la cantidad
          return prevCart.map(item =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          // Si la cantidad es 1, eliminar el producto del carrito
          return prevCart.filter(item => item.id !== productId);
        }
      }
      return prevCart; 
    });
  };

  const getCartSize = () => cart.reduce((total, item) => total + item.quantity, 0); // Total de productos en el carrito

  return { cart, addToCart, removeFromCart, getCartSize };
};

export default useCart;
