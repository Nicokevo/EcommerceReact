import { useState } from 'react';
import { css } from '../../styled-system/css';
import ButtonComponent from './ButtonComponent';

const ProductCardComponent = ({ product, addToCart, removeFromCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsModalOpen(false);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
    setIsModalOpen(false);
  };

  return (
    <div className={css({
      border: '1px solid',
      borderColor: 'gray.200',
      borderRadius: 'md',
      overflow: 'hidden',
      width: '250px',
      transition: 'all 0.2s',
      _hover: { boxShadow: 'lg' }
    })}>
      <img 
        src={product.image} 
        alt={product.name} 
        className={css({ width: '100%', height: '150px', objectFit: 'cover' })} 
      />
      <div className={css({ padding: '3' })}>
        <h3 className={css({ fontSize: 'lg', fontWeight: 'bold', marginBottom: '1' })}>{product.name}</h3>
        <p className={css({ color: 'gray.600', marginBottom: '3', fontSize: 'sm' })}>${product.price.toFixed(2)}</p>
        
        {product.stock > 0 ? (
          <p className={css({ color: 'green.600', fontSize: 'sm', marginBottom: '3' })}>
            Stock disponible: {product.stock}
          </p>
        ) : (
          <p className={css({ color: 'red.600', fontSize: 'sm', marginBottom: '3' })}>
            Sin stock
          </p>
        )}

        <button 
          onClick={() => setIsModalOpen(true)}
          className={css({
            backgroundColor: 'blue.500',
            color: 'white',
            padding: '2',
            borderRadius: 'md',
            width: 'full',
            fontSize: 'sm',
            fontWeight: 'bold',
            transition: 'background-color 0.3s, transform 0.2s',
            _hover: { backgroundColor: 'blue.600', transform: 'scale(1.05)' },
            _active: { backgroundColor: 'blue.700', transform: 'scale(0.95)' },
          })}>
          View Details
        </button>
        
        <ButtonComponent 
          text='Add to cart'
          onClick={handleAddToCart} 
          disabled={product.stock === 0}
          className={css({
            backgroundColor: product.stock > 0 ? 'green.500' : 'gray.400',
            color: 'white',
            padding: '2',
            borderRadius: 'md',
            width: 'full',
            fontSize: 'sm',
            fontWeight: 'bold',
            marginTop: '2',
            transition: 'background-color 0.3s, transform 0.2s',
            _hover: { backgroundColor: product.stock > 0 ? 'green.600' : 'gray.400', transform: 'scale(1.05)' },
            _active: { backgroundColor: product.stock > 0 ? 'green.700' : 'gray.400', transform: 'scale(0.95)' },
          })}
        />
        
        <ButtonComponent 
          text='Remove from cart'
          onClick={handleRemoveFromCart} 
          className={css({
            backgroundColor: 'red',
            color: 'white',
            padding: '2',
            borderRadius: 'md',
            width: 'full',
            fontSize: 'sm',
            fontWeight: 'bold',
            marginTop: '2',
            transition: 'background-color 0.3s, transform 0.2s',
            _hover: { backgroundColor: 'red.600', transform: 'scale(1.05)' },
            _active: { backgroundColor: 'red.700', transform: 'scale(0.95)' },
          })}
        />
      </div>

      {isModalOpen && (
        <div className={css({
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '50'
        })}>
          <div className={css({
            backgroundColor: 'white',
            padding: '6',
            borderRadius: 'md',
            maxWidth: '400px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          })}>
            <h2 className={css({ fontSize: '2xl', fontWeight: 'bold', marginBottom: '4' })}>{product.name}</h2>
            <p className={css({ marginBottom: '4' })}>{product.description}</p>
            <img src={product.image} 
                 alt={product.name} 
                 className={css({ width: '100%', height: '100%', objectFit: 'cover' })} 
            />
            <ButtonComponent 
              onClick={handleAddToCart}
              text='Add to cart'
              disabled={product.stock === 0}
              className={css({
                backgroundColor: product.stock > 0 ? 'green.500' : 'gray.400',
                color: 'white',
                padding: '2',
                borderRadius: 'md',
                width: 'full',
                fontSize: 'sm',
                fontWeight: 'bold',
                marginTop: '4',
                transition: 'background-color 0.3s, transform 0.2s',
                _hover: { backgroundColor: product.stock > 0 ? 'green.600' : 'gray.400', transform: 'scale(1.05)' },
                _active: { backgroundColor: product.stock > 0 ? 'green.700' : 'gray.400', transform: 'scale(0.95)' },
              })}
            />
            <ButtonComponent 
              text='Remove from cart'
              onClick={handleRemoveFromCart}
              className={css({
                backgroundColor: 'red',
                color: 'white',
                padding: '2',
                borderRadius: 'md',
                width: 'full',
                fontSize: 'sm',
                fontWeight: 'bold',
                marginTop: '4',
                transition: 'background-color 0.3s, transform 0.2s',
                _hover: { backgroundColor: 'red.600', transform: 'scale(1.05)' },
                _active: { backgroundColor: 'red.700', transform: 'scale(0.95)' },
              })}
            />
            <button 
              onClick={() => setIsModalOpen(false)}
              className={css({
                backgroundColor: 'red.500',
                color: 'white',
                padding: '2',
                borderRadius: 'md',
                width: '100%',
                fontSize: 'sm',
                fontWeight: 'bold',
                marginTop: '2',
                transition: 'background-color 0.3s, transform 0.2s',
                _hover: { backgroundColor: 'red.600', transform: 'scale(1.05)' },
                _active: { backgroundColor: 'red.700', transform: 'scale(0.95)' },
              })}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCardComponent;
