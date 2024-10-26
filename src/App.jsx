import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import ItemListContainerComponent from './components/ItemListContainerComponent';

function App() {
    const [cartCount, setCartCount] = useState(0); 
    const handleAddToCart = () => {
        setCartCount(prevCount => prevCount + 1); 
    };

    return (
        <div>
            <header>
                <NavbarComponent cartCount={cartCount} /> 
            </header>
            <main>
                <Routes>
                    <Route 
                        path="/" 
                        element={<ItemListContainerComponent 
                            greeting="Welcome to Our Store" 
                            text="Explore our products!" 
                            onAddToCart={handleAddToCart} 
                        />} 
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;
