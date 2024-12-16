import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CartProvider, useCart } from './context/CartContext';
import { css } from '../styled-system.css';

import NavbarComponent from './components/NavbarComponent';
import ProductListComponent from './components/ProductListComponent';
import ProductDetailPage from './components/ProductDetailPage';
import CartPanelComponent from './components/CartPanelComponent';
import CheckoutForm from './components/CheckoutForm';
import Home from './pages/Home';

import './index.css';

function AppContent() {
  const { addToCart, removeFromCart, getCartSize, cart, isInCart } = useCart();
  const cartSize = getCartSize();
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { isDarkMode } = useTheme();

  const toggleCart = () => setIsCartVisible((prevState) => !prevState);
  const closeCart = () => setIsCartVisible(false);

  return (
    <Router>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: isDarkMode ? 'gray.900' : 'gray.50',
          color: isDarkMode ? 'gray.50' : 'gray.900',
          transition: 'background-color 0.3s, color 0.3s',
        })}
      >
        <NavbarComponent counter={cartSize} />
        
        <div
          onClick={toggleCart}
          className={css({
            position: 'fixed',
            top: '16px',
            right: '16px',
            zIndex: '50',
            cursor: 'pointer',
          })}
        >
          🛒
        </div>

        <CartPanelComponent isVisible={isCartVisible} onClose={closeCart} cart={cart} />

        <main
          className={css({
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '8',
            padding: '4',
            maxWidth: '1200px',
            margin: '0 auto',
          })}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={<ProductListComponent addToCart={addToCart} removeFromCart={removeFromCart} isInCart={isInCart} />}
            />
            <Route
              path="/category/:categoryId"
              element={<ProductListComponent addToCart={addToCart} removeFromCart={removeFromCart} isInCart={isInCart} />}
            />
            <Route
              path="/product/:productId"
              element={<ProductDetailPage addToCart={addToCart} removeFromCart={removeFromCart} isInCart={isInCart} />}
            />
            <Route
              path="/checkout"
              element={
                <div>
                  <h1
                    className={css({ fontSize: '2xl', fontWeight: 'bold', marginBottom: '4' })}
                  >
                    Finalizar Compra
                  </h1>
                  <CheckoutForm />
                </div>
              }
            />
          </Routes>
        </main>

        <footer
          className={css({
            textAlign: 'center',
            padding: '10 0',
            borderTop: '1px solid',
            borderColor: isDarkMode ? 'gray.700' : 'gray.200',
          })}
        >
          © 2025 Drift Style. Todos los derechos reservados.
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

