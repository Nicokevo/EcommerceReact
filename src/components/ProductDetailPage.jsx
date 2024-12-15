import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, doc, getDoc } from '../services/firebase';
import { FaShoppingCart, FaTrash, FaHome, FaStore } from 'react-icons/fa';
import ImageGallery from './ImageGallery';
import { css } from '../../styled-system/css';
import { flex } from '../../styled-system/patterns';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import LoadingComponent from './LoadingComponent';
import ButtonComponent from './ButtonComponent';

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { isDarkMode } = useTheme();
  const { addToCart, removeFromCart, isInCart, cart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('Product ID is missing');
        setLoading(false);
        return;
      }
      try {
        const productRef = doc(db, 'products', productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = productSnap.data();
          setProduct({ 
            id: productSnap.id, 
            ...productData,
            images: productData.images || { primary: productData.image }
          });
        } else {
          setError('Product not found');
        }
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error loading product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) || value < 1 ? 1 : Math.min(value, product?.stock || 1));
  };

  const handleAddToCart = useCallback(() => {
    if (product) {
      addToCart(product, quantity);
    }
  }, [product, quantity, addToCart]);

  const handleRemoveFromCart = useCallback(() => {
    if (product) {
      removeFromCart(product.id);
    }
  }, [product, removeFromCart]);

  const availableStock = useCallback(() => {
    if (!product) return 0;
    const cartItem = cart.find(item => item.id === product.id);
    return product.stock - (cartItem ? cartItem.quantity : 0);
  }, [product, cart]);

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return (
      <div className={css({ 
        textAlign: 'center', 
        color: isDarkMode ? 'red.300' : 'red.500', 
        fontSize: 'xl', 
        padding: '8',
        backgroundColor: isDarkMode ? 'gray.800' : 'red.50',
        borderRadius: 'lg',
        maxWidth: '600px',
        margin: '16 auto',
        boxShadow: 'md'
      })}>
        <h2 className={css({ fontSize: '2xl', fontWeight: 'bold', marginBottom: '4' })}>Error</h2>
        <p>{error}</p>
        <Link to="/" className={css({ 
          display: 'inline-block', 
          marginTop: '4', 
          color: isDarkMode ? 'blue.300' : 'blue.600', 
          textDecoration: 'underline',
          _hover: { color: isDarkMode ? 'blue.400' : 'blue.800' }
        })}>
           Volver a la tienda
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={css({ 
        textAlign: 'center', 
        fontSize: 'xl', 
        padding: '8',
        backgroundColor: isDarkMode ? 'gray.800' : 'gray.50',
        color: isDarkMode ? 'gray.100' : 'gray.900',
        borderRadius: 'lg',
        maxWidth: '600px',
        margin: '16 auto',
        boxShadow: 'md'
      })}>
        <h2 className={css({ fontSize: '2xl', fontWeight: 'bold', marginBottom: '4' })}>Product not found</h2>
        <Link to="/" className={css({ 
          display: 'inline-block', 
          marginTop: '4', 
          color: isDarkMode ? 'blue.300' : 'blue.600', 
          textDecoration: 'underline',
          _hover: { color: isDarkMode ? 'blue.400' : 'blue.800' }
        })}>
          Volver a la tienda
        </Link>
      </div>
    );
  }

  const allImages = [
    product.images.primary,
    product.images.secondary,
    ...(product.images.gallery || [])
  ].filter(Boolean);

  return (
    <div className={css({ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '6',
      backgroundColor: isDarkMode ? 'gray.800' : 'white',
      color: isDarkMode ? 'gray.100' : 'gray.900',
      borderRadius: 'xl',
      boxShadow: 'lg',
    })}>
      <nav className={css({ marginBottom: '6' })}>
        <ol className={flex({ alignItems: 'center', gap: '2', fontSize: 'sm', color: isDarkMode ? 'gray.400' : 'gray.600' })}>
          <li>
            <Link to="/" className={css({ 
              _hover: { color: isDarkMode ? 'blue.300' : 'blue.600' },
              display: 'flex',
              alignItems: 'center',
              gap: '1'
            })}>
              <FaHome />
              <span>Home</span>
            </Link>
          </li>
          <li>{' / '}</li>
          <li>
            <Link to="/products" className={css({ 
              _hover: { color: isDarkMode ? 'blue.300' : 'blue.600' },
              display: 'flex',
              alignItems: 'center',
              gap: '1'
            })}>
              <FaStore />
              <span>Productos</span>
            </Link>
          </li>
          <li>{' / '}</li>
          <li className={css({ fontWeight: 'medium', color: isDarkMode ? 'gray.200' : 'gray.900' })}>{product.name}</li>
        </ol>
      </nav>
      <div className={flex({ direction: { base: 'column', md: 'row' }, gap: '8' })}>
        <ImageGallery images={allImages} />
        <div className={css({ flex: '1' })}>
          <h1 className={css({ fontSize: '3xl', fontWeight: 'bold', marginBottom: '4', color: isDarkMode ? 'gray.100' : 'gray.900' })}>
            {product.name}
          </h1>
          <p className={css({ fontSize: '2xl', fontWeight: 'bold', color: isDarkMode ? 'green.300' : 'green.600', marginBottom: '4' })}>
            ${product.price.toFixed(2)}
          </p>
          <p className={css({ marginBottom: '6', lineHeight: '1.8', color: isDarkMode ? 'gray.300' : 'gray.700' })}>
            {product.description}
          </p>
          <div className={css({ 
            marginBottom: '6', 
            padding: '4', 
            backgroundColor: availableStock() > 0 
              ? (isDarkMode ? 'green.800' : 'white') 
              : (isDarkMode ? 'red.800' : 'red.50'), 
            borderRadius: 'md',
            display: 'inline-block'
          })}>
            <p className={css({
              fontWeight: 'bold',
              color: availableStock() > 0 
                ? (isDarkMode ? 'white' : 'green.700')
                : (isDarkMode ? 'red.300' : 'red.700'),
            })}>
              {availableStock() > 0 ? `En Stock: ${availableStock()} disponible` : 'No hay stock por el momento'}
            </p>
          </div>

          {availableStock() > 0 && (
            <div className={css({ marginBottom: '6' })}>
              <label htmlFor="quantity" className={css({ display: 'block', marginBottom: '2', fontSize: 'sm', fontWeight: 'medium', color: isDarkMode ? 'gray.300' : 'gray.700' })}>
                Cantidad
              </label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={availableStock()}
                className={css({
                  width: '24',
                  padding: '2',
                  borderRadius: 'md',
                  borderColor: isDarkMode ? 'gray.600' : 'gray.300',
                  backgroundColor: isDarkMode ? 'gray.700' : 'white',
                  color: isDarkMode ? 'gray.100' : 'gray.900',
                  _focus: { 
                    borderColor: isDarkMode ? 'blue.400' : 'blue.500', 
                    outline: 'none', 
                    boxShadow: isDarkMode 
                      ? '0 0 0 1px rgba(66, 153, 225, 0.6)' 
                      : '0 0 0 1px rgba(66, 153, 225, 0.6)' 
                  }
                })}
              />
            </div>
          )}

          <div className={flex({ gap: '4' })}>
            {isInCart(product.id) ? (
              <ButtonComponent
                onClick={handleRemoveFromCart}
                text="Quitar del Carrito"
                color="accent"
                size="small"
                className={css({ flex: 1 })}
                icon={<FaTrash />}
              />
            ) : (
              <ButtonComponent
                onClick={handleAddToCart}
                text="Agregar al Carrito"
                color={isDarkMode ? "secondary" : "primary"}
                size="small"
                disabled={availableStock() === 0}
                className={css({ flex: 1 })}
                icon={<FaShoppingCart />}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;

