import  { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CartProvider, useCart } from './context/CartContext';
import { css } from '../styled-system/css';
import { flex } from '../styled-system/patterns';
import NavbarComponent from './components/NavbarComponent';
import ProductListComponent from './components/ProductListComponent';
import ProductDetailPage from './components/ProductDetailPage';
import CartComponent from './components/CartComponent';
import CartDetailComponent from './components/CartDetailComponent';
import CheckoutForm from './components/CheckoutForm';
import CartPanelComponent from './components/CartPanelComponent';
import './index.css';


function AppContent() {
  const { addToCart, removeFromCart, getCartSize, cart } = useCart();
  const cartSize = getCartSize();
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme(); 

  const toggleCart = () => setIsCartVisible(prevState => !prevState);
  const closeCart = () => setIsCartVisible(false);

  return (
    <Router>
      <div className={css({
        minHeight: '100vh',
        backgroundColor: isDarkMode ? 'gray.900' : 'gray.50',
        color: isDarkMode ? 'gray.50' : 'gray.900',
        transition: 'background-color 0.3s, color 0.3s'
      })}>
        <NavbarComponent counter={cartSize} />
        
        <div onClick={toggleCart} className={css({
          position: 'absolute', top: '16px', right: '16px'
        })}>
          <CartComponent counter={cartSize} />
        </div>

        <button
          onClick={toggleTheme}
          className={css({
            position: 'absolute',
            top: '16px',
            left: '16px',
            padding: '8px',
            borderRadius: 'full',
            backgroundColor: isDarkMode ? 'yellow.400' : 'gray.800',
            color: isDarkMode ? 'gray.800' : 'yellow.400',
            transition: 'background-color 0.3s, color 0.3s'
          })}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        <CartPanelComponent isVisible={isCartVisible} onClose={closeCart} cart={cart} />

        <main className={flex({
          direction: 'column',
          gap: '8',
          padding: '4',
          maxWidth: '1200px',
          margin: '0 auto'
        })}>
          
          <Routes>
            <Route path="/" element={<ProductListComponent addToCart={addToCart} removeFromCart={removeFromCart} />} />
            <Route path="/category/:categoryId" element={<ProductListComponent addToCart={addToCart} removeFromCart={removeFromCart} />} />
            <Route path="/product/:productId" element={<ProductDetailPage addToCart={addToCart} removeFromCart={removeFromCart} />} />
            <Route path="/cart/detail" element={<CartDetailComponent />} />
            <Route path="/checkout" element={<CheckoutForm />} />
          </Routes>
        </main>

        <footer className={css({
          textAlign: 'center',
          padding: '4',
          borderTop: '1px solid',
          borderColor: isDarkMode ? 'gray.700' : 'gray.200'
        })}>
          © 2024 Drift Style. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;

