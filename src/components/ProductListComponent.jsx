import { useState } from 'react';
import { css } from '../../styled-system/css';
import { grid } from '../../styled-system/patterns';
import ProductCardComponent from './ProductCardComponent';
import products from '../data/products';
import { CategoryEnum } from './NavbarComponent';

const ProductListComponent = ({ addToCart, removeFromCart }) => {

  const [selectedCategory, setSelectedCategory] = useState(null);


  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={css({ padding: '6' })}>
      <h2 className={css({ fontSize: '3xl', fontWeight: 'bold', marginBottom: '6', textAlign: 'center' })}>
        Our Products
      </h2>

      {/* Filtro de categorías */}
      <div className={css({ marginBottom: '6', textAlign: 'center' })}>
        <button 
          className={css({ marginRight: '4', padding: '2', background: selectedCategory === null ? 'gray.600' : 'transparent' })}
          onClick={() => handleCategoryChange(null)}
        >
          All Products
        </button>
        <button 
          className={css({ marginRight: '4', padding: '2', background: selectedCategory === CategoryEnum.BEST_SELLERS ? 'gray.600' : 'transparent' })}
          onClick={() => handleCategoryChange(CategoryEnum.BEST_SELLERS)}
        >
          Best Sellers
        </button>
        <button 
          className={css({ marginRight: '4', padding: '2', background: selectedCategory === CategoryEnum.OFFERS ? 'gray.600' : 'transparent' })}
          onClick={() => handleCategoryChange(CategoryEnum.OFFERS)}
        >
          Offers
        </button>
        <button 
          className={css({ marginRight: '4', padding: '2', background: selectedCategory === CategoryEnum.JACKETS ? 'gray.600' : 'transparent' })}
          onClick={() => handleCategoryChange(CategoryEnum.JACKETS)}
        >
          Jackets
        </button>
        <button 
          className={css({ marginRight: '4', padding: '2', background: selectedCategory === CategoryEnum.COATS ? 'gray.600' : 'transparent' })}
          onClick={() => handleCategoryChange(CategoryEnum.COATS)}
        >
          Coats
        </button>
      </div>


      <div className={grid({ columns: { base: 1, md: 2, lg: 3, xl: 4 }, gap: '6' })}>
        {filteredProducts.map(product => (
          <ProductCardComponent 
            key={product.id} 
            product={product} 
            addToCart={addToCart} 
            removeFromCart={removeFromCart} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductListComponent;
