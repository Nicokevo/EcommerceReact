import  { useState } from 'react';
import { css } from '../../styled-system/css';
import { useTheme } from '../context/ThemeContext';
import ButtonComponent from './ButtonComponent';

const ProductCard = ({ product, addToCart, removeFromCart, isInCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isDarkMode } = useTheme();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };

  const calculateDiscountedPrice = () => {
    if (product.discount > 0) {
      return (product.price * (1 - product.discount / 100)).toFixed(2);
    }
    return product.price.toFixed(2);
  };

  const calculateInstallments = () => {
    const discountedPrice = calculateDiscountedPrice();
    const installmentAmount = (parseFloat(discountedPrice) / 3).toFixed(2);
    return `3 cuotas sin interés de $${installmentAmount}`;
  };

  return (
    <div 
      className={css({
        width: '300px',
        maxWidth: '600px',
        height: '550px',
        backgroundColor: isDarkMode ? 'gray.800' : 'white',
        borderRadius: 'xl',
        border: isDarkMode ? '1px solid token(colors.gray.700)' : '1px solid token(colors.gray.200)',
        boxShadow: isDarkMode ? '0 10px 25px rgba(0, 0, 0, 0.3)' : '0 10px 25px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: isDarkMode ? '0 15px 30px rgba(0, 0, 0, 0.4)' : '0 15px 30px rgba(0, 0, 0, 0.15)',
        },
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={css({
        width: '100%',
        height: '300px',
        overflow: 'hidden',
        borderTopLeftRadius: 'xl',
        borderTopRightRadius: 'xl',
        position: 'relative',
      })}>
        <img 
          src={isHovered && product.images.secondary ? product.images.secondary : product.images.primary}
          alt={product.name} 
          className={css({
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.3s ease',
          })}
        />
        {product.discount > 0 && (
          <div className={css({
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'green.500',
            color: 'white',
            padding: '6px 12px',
            borderRadius: 'full',
            fontSize: 'sm',
            fontWeight: 'bold',
            zIndex: 1,
          })}>
            {product.discount}% OFF
          </div>
        )}
        {product.promotion && (
          <div className={css({
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'orange.500',
            color: 'white',
            padding: '6px 12px',
            borderRadius: 'full',
            fontSize: 'sm',
            fontWeight: 'bold',
            zIndex: 1,
          })}>
            {product.promotion}
          </div>
        )}
      </div>

      <div className={css({
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        flex: 1,
      })}>
        <h3 className={css({
          fontSize: 'xl',
          fontWeight: 'bold',
          color: isDarkMode ? 'gray.50' : 'gray.800',
          marginBottom: '5px',
        })}>
          {product.name}
        </h3>

        <div className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        })}>
          {product.discount > 0 ? (
            <>
              <p className={css({
                fontSize: 'lg',
                fontWeight: 'bold',
                color: isDarkMode ? 'gray.400' : 'gray.500',
                textDecoration: 'line-through',
              })}>
                ${product.price.toFixed(2)}
              </p>
              <p className={css({
                fontSize: '2xl',
                fontWeight: 'bold',
                color: isDarkMode ? 'green.300' : 'green.600',
              })}>
                ${calculateDiscountedPrice()}
              </p>
            </>
          ) : (
            <p className={css({
              fontSize: '2xl',
              fontWeight: 'bold',
              color: isDarkMode ? 'blue.300' : 'blue.600',
            })}>
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>
      </div>

      <div className={css({
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        transition: 'opacity 0.3s ease',
        opacity: isHovered ? 1 : 0,
      })}>
        <p className={css({
          fontSize: 'sm',
          color: isDarkMode ? 'gray.400' : 'gray.600',
        })}>
          {calculateInstallments()}
        </p>
        <div className={css({
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
        })}>
          <ButtonComponent
            onClick={() => window.location.href = `/product/${product.id}`}
            text="Ver Detalles"
            color={isDarkMode ? "dark" : "light"}
            size="small"
            className={css({ flex: 1 })}
          />
          {isInCart ? (
            <ButtonComponent
              onClick={handleRemoveFromCart}
              text="Quitar"
              color="accent"
              size="small"
              className={css({ flex: 1 })}
            />
          ) : (
            <ButtonComponent
              onClick={handleAddToCart}
              text="Agregar al Carrito"
              color={isDarkMode ? "secondary" : "primary"}
              size="small"
              disabled={product.stock === 0}
              className={css({ flex: 1 })}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

