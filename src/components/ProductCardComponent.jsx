import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; // Importa el contexto de tema
import { css } from '../../styled-system/css';
import ButtonComponent from './ButtonComponent';

const ProductCardComponent = ({ product, addToCart, removeFromCart, isInCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isDarkMode } = useTheme(); // Obtén el estado de modo oscuro

  const handleAddToCart = () => {
    const quantity = 1; 
    addToCart(product, quantity); 
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };

  return (
    <div 
      className={css({
        width: '250px', 
        backgroundColor: isDarkMode ? 'gray.800' : 'white', // Cambia según el tema
        borderRadius: 'lg',
        border: isDarkMode ? '1px solid gray.700' : '1px solid #ecf0f1', // Borde según el tema
        boxShadow: isDarkMode ? '0 10px 25px rgba(0, 0, 0, 0.3)' : '0 10px 25px rgba(0, 0, 0, 0.1)', // Sombra según el tema
        position: 'relative',
        margin: '20px',
        minHeight: '450px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        }
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={css({
        width: '100%',
        height: '250px', 
        overflow: 'hidden',
        borderTopLeftRadius: 'lg',
        borderTopRightRadius: 'lg',
      })}>
        <img
          src={product.image}
          alt={product.name}
          className={css({
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)', 
            }
          })}
        />
      </div>

      <div className={css({
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        flex: '1',
      })}>
        <h3 className={css({
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: isDarkMode ? 'gray.50' : '#2c3e50', // Texto según el tema
          marginBottom: '5px',
        })}>{product.name}</h3>

        <p className={css({
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: isDarkMode ? 'blue.300' : '#3498db', // Precio según el tema
        })}>${product.price.toFixed(2)}</p>

        <p className={css({
          fontSize: '0.9rem',
          color: product.stock > 0 ? (isDarkMode ? 'green.400' : '#2ecc71') : (isDarkMode ? 'red.400' : '#e74c3c'),
        })}>
          {product.stock > 0 ? `In stock: ${product.stock}` : 'Sold out'}
        </p>
      </div>

      <div className={css({
        position: 'absolute',
        bottom: '20px', 
        left: '50%',
        transform: `translateX(-50%) ${isHovered ? 'translateY(0)' : 'translateY(20px)'}`, 
        display: 'flex',
        flexDirection: 'row', 
        gap: '10px',
        opacity: isHovered ? 1 : 0,
        visibility: isHovered ? 'visible' : 'hidden',
        transition: 'all 0.3s ease',
      })}>
        <Link 
          to={`/product/${product.id}`}
          className={css({
            textDecoration: 'none',
          })}
        >
          <ButtonComponent 
            text="View"
            color={isDarkMode ? 'light' : 'light'}
            size="small"
          />
        </Link>

        {isInCart ? (
          <ButtonComponent 
            text="Remove"
            onClick={handleRemoveFromCart}
            color={isDarkMode ? 'red.500' : '#ff4d4d'}
            size="small"
          />
        ) : (
          <ButtonComponent 
            text="Add"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            color={isDarkMode ? 'secondary' : 'secondary'}
            size="small"
          />
        )}
      </div>
    </div>
  );
};

export default ProductCardComponent;
