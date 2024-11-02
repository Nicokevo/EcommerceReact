import { useState } from 'react';
import { css } from '../styled-system/css';
import { flex } from '../styled-system/patterns';
import NavbarComponent from './components/NavbarComponent';
import ItemListContainerComponent from './components/ItemListContainerComponent';
import ProductListComponent from './components/ProductListComponent';
import './index.css';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className={css({ 
      minHeight: '100vh',
      backgroundColor: 'gray.50',
      color: 'gray.900'
    })}>
      <NavbarComponent counter={cartCount} />
      <main className={flex({ 
        direction: 'column', 
        gap: '8', 
        padding: '4', 
        maxWidth: '1200px', 
        margin: '0 auto'
      })}>
        <ItemListContainerComponent 
          greeting='Welcome to Drift Style' 
          text='Find the true urban fashion style'
        />
        <ProductListComponent addToCart={addToCart} />
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
  )
}

export default App;
