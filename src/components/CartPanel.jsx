import { useCart } from "../context/CartContext";
import { css } from '../../styled-system/css';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const CartPanel = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart(); // Añadir clearCart
  const navigate = useNavigate();  // Inicializar el hook de navegación

  if (!Array.isArray(cart)) return null;

  const handleViewDetails = () => {
    navigate('/cart-details');  // Navegar a la página de detalles del carrito
  };

  const handleClearCart = () => {
    clearCart(); // Vaciar el carrito
  };

  return (
    <div className={css({
      position: 'fixed',
      right: isOpen ? '0' : '-400px',
      top: '0',
      width: '350px',
      height: '100vh',
      backgroundColor: 'white',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      transition: 'right 0.3s ease-in-out',
      overflowY: 'auto',
      padding: '20px',
      borderLeft: '2px solid #f1f1f1',
    })}>
      <div className={css({ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' })}>
        <h2 className={css({ fontSize: '1.5rem', color: '#333' })}>Shopping Cart</h2>
        <button
          onClick={onClose}
          className={css({
            backgroundColor: '#ff4d4d',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          })}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#ff2a2a'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ff4d4d'}
        >
          Close
        </button>
      </div>

      {cart.length === 0 ? (
        <p className={css({ color: '#888' })}>Your cart is empty.</p>
      ) : (
        cart.map(item => (
          <div key={item.id} className={css({
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '10px 0', 
            borderBottom: '1px solid #f1f1f1',
            alignItems: 'center'
          })}>
            <div className={css({ display: 'flex', alignItems: 'center' })}>
              <img 
                src={item.image} 
                alt={item.name} 
                className={css({ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px', marginRight: '10px' })}
              />
              <div>
                <h3 className={css({ margin: 0, fontSize: '1rem', color: '#333' })}>{item.name}</h3>
                <p className={css({ margin: 0, color: '#555' })}>Quantity: {item.quantity}</p>
              </div>
            </div>
            <div className={css({ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' })}>
              <span className={css({ color: '#007BFF', fontWeight: 'bold' })}>${(item.price * item.quantity).toFixed(2)}</span>
              <div>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                  className={css({ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '5px', borderRadius: '5px', cursor: 'pointer' })}
                >
                  +
                </button>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                  className={css({ backgroundColor: '#ffcc00', color: 'white', border: 'none', padding: '5px', borderRadius: '5px', cursor: 'pointer', marginLeft: '5px' })}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
              </div>
              <button 
                onClick={() => removeFromCart(item.id)} 
                className={css({ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px', borderRadius: '5px', cursor: 'pointer', marginTop: '5px' })}
              >
                Remove
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
        borderTop: '2px solid #f1f1f1',
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
          onClick={handleClearCart}  // Llamar a la función de vaciar el carrito
          className={css({ 
            padding: '10px 15px', 
            backgroundColor: '#ffcc00', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer', 
            transition: 'background-color 0.3s ease' 
          })}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#e6b800'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ffcc00'}
        >
          Clear Cart
        </button>
        <button 
          onClick={handleViewDetails}  // Llamar a la función de navegación
          className={css({ 
            padding: '10px 15px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer', 
            transition: 'background-color 0.3s ease' 
          })}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default CartPanel;
