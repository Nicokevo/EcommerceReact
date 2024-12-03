import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext'; // Importa el contexto de tema
import { css } from '../../styled-system/css';
import { useNavigate } from 'react-router-dom';

const CartPanelComponent = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isDarkMode } = useTheme(); // Obtén el estado de modo oscuro
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!Array.isArray(cart)) return null;

  const handleClearCart = () => {
    clearCart();
    setError(''); // Limpiamos el mensaje de error
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setError('Tu carrito está vacío. Agrega productos antes de finalizar la compra.');
      return;
    }
    setError(''); // Limpiamos el mensaje de error
    navigate('/checkout');
    onClose();
  };

  return (
    <div className={css({
      position: 'fixed',
      right: isOpen ? '0' : '-400px',
      top: '0',
      width: '350px',
      height: '100vh',
      backgroundColor: isDarkMode ? 'gray.800' : 'white', // Cambia según el tema
      color: isDarkMode ? 'gray.50' : 'gray.900', // Cambia el color del texto
      boxShadow: isDarkMode ? '0 4px 8px rgba(255, 255, 255, 0.1)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      transition: 'right 0.3s ease-in-out, background-color 0.3s, color 0.3s',
      overflowY: 'auto',
      padding: '20px',
      borderLeft: `2px solid ${isDarkMode ? 'gray.700' : '#f1f1f1'}`,
    })}>
      <div className={css({ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' })}>
        <h2 className={css({ fontSize: '1.5rem' })}>Carrito de Compras</h2>
        <button
          onClick={onClose}
          className={css({
            backgroundColor: isDarkMode ? 'red.500' : '#ff4d4d',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            '&:hover': { backgroundColor: isDarkMode ? 'red.600' : '#ff2a2a' }
          })}
        >
          Cerrar
        </button>
      </div>

      {error && (
        <p className={css({
          color: isDarkMode ? 'red.300' : 'red',
          backgroundColor: isDarkMode ? 'gray.700' : '#fdd',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '15px',
        })}>
          {error}
        </p>
      )}

      {cart.length === 0 ? (
        <p className={css({ color: isDarkMode ? 'gray.400' : '#888' })}>Tu carrito está vacío.</p>
      ) : (
        cart.map(item => (
          <div key={item.id} className={css({
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 0',
            borderBottom: `1px solid ${isDarkMode ? 'gray.700' : '#f1f1f1'}`,
            alignItems: 'center'
          })}>
            <div className={css({ display: 'flex', alignItems: 'center' })}>
              <img 
                src={item.image} 
                alt={item.name} 
                className={css({ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px', marginRight: '10px' })}
              />
              <div>
                <h3 className={css({ margin: 0, fontSize: '1rem', color: isDarkMode ? 'gray.50' : '#333' })}>{item.name}</h3>
                <p className={css({ margin: 0, color: isDarkMode ? 'gray.400' : '#555' })}>Cantidad: {item.quantity}</p>
              </div>
            </div>
            <div className={css({ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' })}>
              <span className={css({ color: isDarkMode ? 'blue.300' : '#007BFF', fontWeight: 'bold' })}>${(item.price * item.quantity).toFixed(2)}</span>
              <div>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                  className={css({ backgroundColor: isDarkMode ? 'green.500' : '#4CAF50', color: 'white', border: 'none', padding: '5px', borderRadius: '5px', cursor: 'pointer' })}
                >
                  +
                </button>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                  className={css({
                    backgroundColor: isDarkMode ? 'yellow.600' : '#ffcc00',
                    color: 'white',
                    border: 'none',
                    padding: '5px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginLeft: '5px',
                    '&:disabled': { backgroundColor: isDarkMode ? 'gray.600' : '#e0e0e0', cursor: 'not-allowed' },
                  })}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
              </div>
              <button 
                onClick={() => removeFromCart(item.id)} 
                className={css({ backgroundColor: isDarkMode ? 'red.500' : '#ff4d4d', color: 'white', border: 'none', padding: '5px', borderRadius: '5px', cursor: 'pointer', marginTop: '5px' })}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))
      )}

      <div className={css({
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '1.2rem',
        borderTop: `2px solid ${isDarkMode ? 'gray.700' : '#f1f1f1'}`,
        paddingTop: '10px'
      })}>
        <span>Total:</span>
        <span className={css({ fontWeight: 'bold' })}>${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
      </div>

      <div className={css({
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px'
      })}>
        <button 
          onClick={handleClearCart}
          className={css({ 
            padding: '10px 15px', 
            backgroundColor: isDarkMode ? 'yellow.500' : '#ffcc00', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer', 
            transition: 'background-color 0.3s ease' 
          })}
        >
          Vaciar Carrito
        </button>
        <button 
          onClick={handleCheckout}
          className={css({ 
            padding: '10px 15px', 
            backgroundColor: isDarkMode ? 'green.500' : '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer', 
            transition: 'background-color 0.3s ease' 
          })}
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default CartPanelComponent;
