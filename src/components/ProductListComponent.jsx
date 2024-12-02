// ProductListComponent.js
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { css } from '../../styled-system/css';
import { grid, flex } from '../../styled-system/patterns';
import ProductCardComponent from './ProductCardComponent';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../services/firebase';
import LoadingComponent from './LoadingComponent';  // Importa el spinner

const ProductListComponent = ({ addToCart, removeFromCart }) => {
  const { categoryId } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const productsRef = collection(db, 'products');
        let q = productsRef;

        if (categoryId && categoryId !== 'all') {
          q = query(productsRef, where('CategoryEnum', '==', categoryId));
        }

        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id, 
          ...doc.data(),
          category: doc.data().CategoryEnum 
        }));

        setFilteredProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Hubo un problema al cargar los productos. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return <LoadingComponent />; 
  }

  if (error) {
    return <p className={css({ textAlign: 'center', marginTop: '6', color: 'red.500', fontSize: 'xl' })}>{error}</p>;
  }

  const categoryName = categoryId ? categoryId.replace('_', ' ').toUpperCase() : 'ALL PRODUCTS';

  return (
    <div className={css({ padding: '6' })}>
      <div className={flex({ justifyContent: 'space-between', alignItems: 'center', marginBottom: '6' })}>
        <h2 className={css({ fontSize: '3xl', fontWeight: 'bold' })}>
          {categoryName}
        </h2>
        {categoryId && categoryId !== 'all' && (
          <Link 
            to="/" 
            className={css({ 
              color: 'gray.600', 
              textDecoration: 'none', 
              fontSize: 'sm',
              padding: '2',
              borderRadius: 'md',
              transition: 'all 0.2s',
              _hover: { 
                backgroundColor: 'gray.100',
                color: 'gray.900'
              }
            })}>
            ← Back to all categories
          </Link>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <p className={css({ textAlign: 'center', marginTop: '6', fontSize: 'xl' })}>
          No products were found in this category.
        </p>
      ) : (
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
      )}
    </div>
  );
};

export default ProductListComponent;
