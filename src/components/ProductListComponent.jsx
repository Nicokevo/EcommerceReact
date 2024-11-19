import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { css } from '../../styled-system/css';
import { grid } from '../../styled-system/patterns';
import ProductCardComponent from './ProductCardComponent';
import { products } from '../data/products';

const ProductListComponent = ({ addToCart, removeFromCart }) => {
  const { categoryId } = useParams();
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (categoryId) {
      setFilteredProducts(products.filter(product => product.category === categoryId));
    } else {
      setFilteredProducts(products);
    }
  }, [categoryId]);

  return (
    <div className={css({ padding: '6' })}>
      <h2 className={css({ fontSize: '3xl', fontWeight: 'bold', marginBottom: '6', textAlign: 'center' })}>
        {categoryId ? categoryId.replace('_', ' ').toUpperCase() : 'ALL STOCK'}
      </h2>

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