import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { css } from '../../styled-system/css';
import { flex } from '../../styled-system/patterns';
import ButtonComponent from './ButtonComponent';
import { getProduct } from '../data/products';

const ProductDetailPage = ({ addToCart, removeFromCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('Product ID is missing');
        setLoading(false);
        return;
      }
      try {
        const fetchedProduct = await getProduct(String(productId));
        if (!fetchedProduct) {
          setError('Product not found');
          setLoading(false);
          return;
        }
        setProduct(fetchedProduct);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error loading product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div className={css({ textAlign: 'center', fontSize: 'xl', padding: '8' })}>Loading...</div>;
  if (error) return <div className={css({ textAlign: 'center', color: 'red.500', fontSize: 'xl', padding: '8' })}>Error: {error}</div>;
  if (!product) return <div className={css({ textAlign: 'center', fontSize: 'xl', padding: '8' })}>Producto no encontrado</div>;

  return (
    <div className={css({ padding: '6', maxWidth: '1200px', margin: '0 auto' })}>
      <Link to="/" className={css({ 
        display: 'inline-flex', 
        alignItems: 'center', 
        marginBottom: '4', 
        color: 'blue.500',
        _hover: { textDecoration: 'underline' }
      })}>
        <svg xmlns="http://www.w3.org/2000/svg" className={css({ marginRight: '2', width: '4', height: '4' })} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to the stock 
      </Link>

      <div className={flex({ gap: '6', flexDirection: { base: 'column', md: 'row' } })}>
        <img
          src={product.image}
          alt={product.name}
          className={css({ 
            width: '100%', 
            maxWidth: '400px', 
            height: 'auto', 
            objectFit: 'cover',
            borderRadius: 'md',
            boxShadow: 'md'
          })} />
        <div className={css({ flex: '1' })}>
          <h1 className={css({ fontSize: '3xl', fontWeight: 'bold', marginBottom: '4' })}>{product.name}</h1>
          <p className={css({ fontSize: 'xl', marginBottom: '4', color: 'green.600', fontWeight: 'bold' })}>
            ${product.price.toFixed(2)}
          </p>
          <p className={css({ marginBottom: '4', lineHeight: '1.6' })}>{product.description}</p>
          <p className={css({ 
            marginBottom: '4', 
            fontWeight: 'bold',
            color: product.stock > 0 ? 'green.600' : 'red.500'
          })}>
            Stock: {product.stock > 0 ? product.stock : 'Sold out'}
          </p>

          <div className={flex({ gap: '4' })}>
            <ButtonComponent
              text="Add to cart"
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              color={product.stock > 0 ? "green" : "gray"}
              size="medium"
            />

            <ButtonComponent
              text="Remove from cart"
              onClick={() => removeFromCart(product.id)}
              color="red"
              size="medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
