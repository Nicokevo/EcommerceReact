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

  const addToCart = (product) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex(item => item.id === product.id);

      if (productIndex !== -1) {
        const existingProduct = prevCart[productIndex];

        // Validar stock antes de incrementar la cantidad
        if (existingProduct.quantity < product.stock) {
          const updatedCart = [...prevCart];
          updatedCart[productIndex] = {
            ...existingProduct,
            quantity: existingProduct.quantity + 1,
          };
          return updatedCart;
        }

        // Si se alcanza el stock máximo, devolver el carrito sin cambios
        console.warn(`Stock máximo alcanzado para el producto ${product.id}`);
        return prevCart;
      }

      // Agregar el producto con cantidad inicial 1 si no está en el carrito
      if (product.stock > 0) {
        return [...prevCart, { ...product, quantity: 1 }];
      }

      // No agregar productos sin stock
      console.warn(`El producto ${product.id} no tiene stock disponible`);
      return prevCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex(item => item.id === productId);

      if (productIndex !== -1) {
        const updatedCart = [...prevCart];
        if (updatedCart[productIndex].quantity > 1) {
          // Decrementar la cantidad si hay más de 1 unidad
          updatedCart[productIndex].quantity -= 1;
          return updatedCart;
        }
        // Eliminar el producto si la cantidad es 1
        return updatedCart.filter(item => item.id !== productId);
      }

      // Si no existe, devolver el carrito sin cambios
      return prevCart;
    });
  };

  const updateCartItemQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex(item => item.id === productId);

      if (productIndex !== -1) {
        const existingProduct = prevCart[productIndex];

        // Validar que la cantidad no supere el stock
        const newQuantity = Math.min(quantity, existingProduct.stock || quantity);

        const updatedCart = [...prevCart];
        updatedCart[productIndex] = {
          ...existingProduct,
          quantity: Math.max(1, newQuantity), // Evitar cantidades menores a 1
        };
        return updatedCart;
      }

      // Si no existe el producto, devolver el carrito sin cambios
      return prevCart;
    });
  };

  const getCartSize = () => cart.reduce((total, item) => total + item.quantity, 0);

  return { cart, addToCart, removeFromCart, getCartSize, updateCartItemQuantity };
};

export default useCart;
