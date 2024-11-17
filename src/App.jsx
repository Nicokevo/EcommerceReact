import { css } from '../styled-system/css';
import { flex } from '../styled-system/patterns';
import NavbarComponent from './components/NavbarComponent';
import ItemListContainerComponent from './components/ItemListContainerComponent';
import ProductListComponent from './components/ProductListComponent';
import useCart from './hooks/useCart'; 
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Link} from 'react-router-dom'
function App() {  
  const { addToCart, removeFromCart, getCartSize } = useCart(); 
  const cartSize = getCartSize(); 
 /*
  <BrowserRouter>
    <NavbarReactBootstrap/>
    <Routes>
      <Route path='/' element={<ItemListContainer greeting='Bienvenidos'/>}/>
      <Route path='/products/:category' element={<ItemListContainer greeting='Bienvenidos a la categoria: '/>}/>
      <Route path='/item/:id' element={<ItemDetailContainer/>}/>
    </Routes>
   </BrowserRouter> */
  return (
    <BrowserRouter>
      <div className={css({ 
        minHeight: '100vh',
        backgroundColor: 'gray.50',
        color: 'gray.900'
      })}>
        <NavbarComponent counter={cartSize} /> 
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
          <Routes>
            <Route path="/" element={<ProductListComponent addToCart={addToCart} removeFromCart={removeFromCart} />} />
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
