import { useState } from 'react';
import { Link } from 'react-router-dom';
import { css } from '../../styled-system/css';
import ButtonComponent from './ButtonComponent';

const ProductCardComponent = ({ product, addToCart, removeFromCart, isInCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };

  return (
    <div 
      className={css({
        width: '250px', // Tamaño fijo
        backgroundColor: 'white',
        borderRadius: 'lg',
        border: '1px solid #e0e0e0',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        margin: '20px',
        minHeight: '450px', // Altura fija de la card
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', // Evita que el contenido se desborde
        transition: 'transform 0.3s ease', // Transición suave solo en el escalado
        '&:hover': {
          transform: 'scale(1.05)', // Efecto hover en la card sin modificar altura
        }
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Contenedor de la imagen */}
      <div className={css({
        width: '100%',
        height: '250px', // Altura fija para la imagen
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
              transform: 'scale(1.05)', // Efecto de zoom en la imagen
            }
          })}
        />
      </div>

      {/* Contenedor del contenido */}
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
          color: '#333',
          marginBottom: '5px',
        })}>{product.name}</h3>

        <p className={css({
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#2c5282',
        })}>${product.price.toFixed(2)}</p>

        <p className={css({
          fontSize: '0.9rem',
          color: product.stock > 0 ? 'green' : 'red',
        })}>
          {product.stock > 0 ? `In stock: ${product.stock}` : 'Sold out'}
        </p>
      </div>

      {/* Contenedor de los botones */}
      <div className={css({
        position: 'absolute',
        bottom: '20px', // Los botones estarán en la parte inferior
        left: '50%',
        transform: `translateX(-50%) ${isHovered ? 'translateY(0)' : 'translateY(20px)'}`, 
        display: 'flex',
        flexDirection: 'row', // Los botones se alinean horizontalmente
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
            color="blue"
            size="small"
            className={css({
              width: '40px', // Tamaño pequeño
              height: '40px', // Botón cuadrado
              borderRadius: '6px',
              backgroundColor: '#4299e1',
              color: 'white',
              '&:hover': {
                backgroundColor: '#3182ce',
              }
            })}
          />
        </Link>

        {isInCart ? (
          <ButtonComponent 
            text="Remove"
            onClick={handleRemoveFromCart}
            color="red"
            size="small"
            className={css({
              width: '40px', // Tamaño pequeño
              height: '40px', // Botón cuadrado
              borderRadius: '6px',
              backgroundColor: '#fc8181',
              color: 'white',
              '&:hover': {
                backgroundColor: '#f56565',
              }
            })}
          />
        ) : (
          <ButtonComponent 
            text="Add"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            color="green"
            size="small"
            className={css({
              width: '40px', // Tamaño pequeño
              height: '40px', // Botón cuadrado
              borderRadius: '6px',
              backgroundColor: '#48bb78',
              color: 'white',
              '&:hover': {
                backgroundColor: '#38a169',
              },
              '&:disabled': {
                backgroundColor: '#cbd5e0',
                cursor: 'not-allowed',
              }
            })}
          />
        )}
      </div>
    </div>
  );
};

export default ProductCardComponent;
