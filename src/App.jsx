import { useState } from 'react';
import { css } from '../styled-system/css';
import { flex } from '../styled-system/patterns';
import NavbarComponent from './components/NavbarComponent';
import ProductListComponent from './components/ProductListComponent';
import ProductDetailPage from './components/ProductDetailPage';
import CartComponent from './components/CartComponent';
import useCart from './hooks/useCart'; 
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {  
  const { addToCart, removeFromCart, getCartSize, cart, updateCartItemQuantity } = useCart(); 
  const cartSize = getCartSize();
  const [isCartVisible, setIsCartVisible] = useState(false); 


  const toggleCart = () => setIsCartVisible((prevState) => !prevState);

  const closeCart = () => setIsCartVisible(false);

  const handleBuy = () => {
    alert('Compra realizada con éxito!');
    cart.forEach(item => removeFromCart(item.id));
    closeCart();
  };

  return (
    <BrowserRouter>
      <div className={css({ 
        minHeight: '100vh',
        backgroundColor: 'gray.50',
        color: 'gray.900'
      })}>
        <NavbarComponent counter={cartSize} />
        
        <div onClick={toggleCart} className={css({ position: 'absolute', top: '16px', right: '16px' })}>
          <CartComponent counter={cartSize} />
        </div>

        {isCartVisible && (
          <div className={css({
            position: 'fixed',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '1000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          })}>
            <div className={css({
              backgroundColor: 'white',
              padding: '4',
              borderRadius: 'md',
              width: '90%',
              maxWidth: '500px',
              boxShadow: 'lg',
            })}>
              <h2 className={css({ textAlign: 'center', marginBottom: '4' })}>Shopping Cart</h2>
              <div>
                {cart.length === 0 ? (
                  <p>There are no products in the cart</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className={css({ marginBottom: '4', display: 'flex', justifyContent: 'space-between' })}>
                      <div>{item.name}</div>
                      <div>
                        <button onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className={css({ marginLeft: '4', color: 'red' })}>Delete</button>
                    </div>
                  ))
                )}
              </div>

              <div className={css({ textAlign: 'center' })}>
                <button onClick={handleBuy} className={css({ backgroundColor: 'green.500', color: 'white', padding: '2', borderRadius: 'md' })}>
                  Buy
                </button>
                <button onClick={closeCart} className={css({ backgroundColor: 'gray.500', color: 'white', padding: '2', borderRadius: 'md', marginLeft: '4' })}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <main className={flex({ 
          direction: 'column', 
          gap: '8', 
          padding: '4', 
          maxWidth: '1200px', 
          margin: '0 auto'
        })}>
          <Routes>
            <Route 
              path="/" 
              element={
                <ProductListComponent 
                  addToCart={addToCart} 
                  removeFromCart={removeFromCart} 
                />
              } 
            />
            <Route 
              path="/category/:categoryId" 
              element={
                <ProductListComponent 
                  addToCart={addToCart} 
                  removeFromCart={removeFromCart} 
                />
              } 
            />
            <Route 
              path="/product/:productId" 
              element={
                <ProductDetailPage 
                  addToCart={addToCart} 
                  removeFromCart={removeFromCart} 
                />
              } 
            />
          </Routes>
        </main>
        <footer className={css({ 
          textAlign: 'center', 
          padding: '4', 
          borderTop: '1px solid', 
          borderColor: 'gray.200'
        })}>
          © 2024 Drift Style. All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
