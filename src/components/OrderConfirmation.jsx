import { css } from '../../styled-system/css';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <div className={css({
      maxWidth: '500px',
      margin: '0 auto',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    })}>
      <h2 className={css({ fontSize: '1.5rem', marginBottom: '20px', color: '#333' })}>¡Gracias por tu compra!</h2>
      <p className={css({ marginBottom: '20px', color: '#555' })}>Tu pedido ha sido recibido y está siendo procesado.</p>
      <Link to="/" className={css({
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px',
        '&:hover': {
          backgroundColor: '#45a049'
        }
      })}>
        Volver a la tienda
      </Link>
    </div>
  );
};

export default OrderConfirmation;

