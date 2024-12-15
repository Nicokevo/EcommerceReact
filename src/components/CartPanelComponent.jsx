import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { css } from '../../styled-system/css';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { TfiClose } from "react-icons/tfi";
import 'animate.css';

const CartPanelComponent = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isDarkMode } = useTheme();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!Array.isArray(cart)) return null;

  const handleClearCart = () => {
    clearCart();
    setError('');
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setError('Tu carrito está vacío. Agrega productos antes de finalizar la compra.');
      return;
    }
    setError('');
    navigate('/checkout');
    onClose();
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={css({
      position: 'fixed',
      right: isOpen ? '0' : '-400px',
      top: '0',
      width: '400px',
      height: '100vh',
      backgroundColor: isDarkMode ? 'gray.900' : 'white',
      color: isDarkMode ? 'gray.100' : 'gray.900',
      boxShadow: isDarkMode ? '-4px 0 20px rgba(0, 0, 0, 0.5)' : '-4px 0 20px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      transition: 'right 0.3s ease-in-out, background-color 0.3s, color 0.3s',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    })}>
      <div className={css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: `1px solid ${isDarkMode ? 'gray.700' : 'gray.200'}`,
      })}>
        <h2 className={css({ fontSize: '1.5rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' })}>
          <FaShoppingCart />
          Mi Carrito
        </h2>
        <button
          onClick={onClose}
          className={css({
            backgroundColor: 'transparent',
            color: isDarkMode ? 'gray.400' : 'gray.600',
            fontSize: '1.5rem',
            border: 'none',
            cursor: 'pointer',
            padding: '5px',
            borderRadius: '50%',
            transition: 'background-color 0.2s',
            '&:hover': {
              backgroundColor: isDarkMode ? 'gray.800' : 'gray.200',
            },
          })}
        >
          <TfiClose />
        </button>
      </div>

      {error && (
        <p className={css({
          color: 'red.500',
          fontSize: '0.9rem',
          padding: '10px 20px',
          margin: '0',
          backgroundColor: isDarkMode ? 'red.900' : 'red.100',
          borderRadius: '4px',
        })}>
          {error}
        </p>
      )}

      <div className={css({ flex: 1, overflowY: 'auto', padding: '20px' })}>
        {cart.length === 0 ? (
          <div className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: isDarkMode ? 'gray.400' : 'gray.500',
          })}>
            <FaShoppingCart size={50} className={css({ marginBottom: '20px' })} />
            <p className={css({ fontSize: '1.1rem' })}>Tu carrito está vacío.</p>
          </div>
        ) : (
          cart.map(item => (
            <div key={item.id} className={css({
              display: 'flex',
              padding: '15px 0',
              borderBottom: `1px solid ${isDarkMode ? 'gray.700' : 'gray.200'}`,
              alignItems: 'center',
              gap: '15px',
            })}>
              <img
               src={item.images?.primary || 'https://via.placeholder.com/80x80?text=No+Image'}
                alt={item.name}
                className={css({ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' })}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                }}
              />
              <div className={css({ flex: 1 })}>
                <h3 className={css({ fontSize: '1.1rem', fontWeight: '600', marginBottom: '5px' })}>{item.name}</h3>
                <p className={css({ fontSize: '0.9rem', color: isDarkMode ? 'gray.400' : 'gray.500', marginBottom: '10px' })}>
                  {item.size && `Tamaño: ${item.size}`}
                  {item.size && item.color && ' | '}
                  {item.color && `Color: ${item.color}`}
                </p>
                <div className={css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between' })}>
                  <div className={css({ display: 'flex', alignItems: 'center', gap: '10px' })}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className={css({
                        padding: '5px',
                        backgroundColor: isDarkMode ? 'gray.700' : 'gray.200',
                        color: isDarkMode ? 'gray.300' : 'gray.700',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        transition: 'background-color 0.2s',
                        '&:hover': {
                          backgroundColor: isDarkMode ? 'gray.600' : 'gray.300',
                        },
                        '&:disabled': {
                          opacity: 0.5,
                          cursor: 'not-allowed',
                        },
                      })}
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className={css({ fontSize: '1rem', fontWeight: '600' })}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className={css({
                        padding: '5px',
                        backgroundColor: isDarkMode ? 'gray.700' : 'gray.200',
                        color: isDarkMode ? 'gray.300' : 'gray.700',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        transition: 'background-color 0.2s',
                        '&:hover': {
                          backgroundColor: isDarkMode ? 'gray.600' : 'gray.300',
                        },
                      })}
                      disabled={item.quantity >= item.stock}
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                  <span className={css({ fontSize: '1.1rem', fontWeight: '600' })}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className={css({
                  backgroundColor: 'transparent',
                  color: isDarkMode ? 'gray.400' : 'gray.500',
                  border: 'none',
                  padding: '8px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: 'background-color 0.2s, color 0.2s',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'gray.800' : 'gray.200',
                    color: 'red.500',
                  },
                })}
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>

      <div className={css({
        borderTop: `1px solid ${isDarkMode ? 'gray.700' : 'gray.200'}`,
        padding: '20px',
      })}>
        <div className={css({
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '1.2rem',
          fontWeight: '600',
          marginBottom: '20px',
        })}>
          <span>Total:</span>
          <span className={css({ fontSize: '1.3rem', fontWeight: '700' })}>${total.toFixed(2)}</span>
        </div>

        <div className={css({
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
        })}>
          <button
            onClick={handleClearCart}
            className={css({
              padding: '12px',
              backgroundColor: isDarkMode ? 'gray.700' : 'gray.200',
              color: isDarkMode ? 'gray.100' : 'gray.800',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'background-color 0.2s',
              '&:hover': {
                backgroundColor: isDarkMode ? 'gray.600' : 'gray.300',
              },
            })}
          >
            Vaciar Carrito
          </button>
          <button
            onClick={handleCheckout}
            className={css({
              padding: '12px',
              backgroundColor: 'green.500',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'background-color 0.2s',
              '&:hover': {
                backgroundColor: 'green.600',
              },
            })}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPanelComponent;

