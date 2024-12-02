import { useCart } from '../context/CartContext';
import { css } from '../../styled-system/css';
import { flex } from '../../styled-system/patterns';

const CartComponent = () => {
  const { getCartSize } = useCart(); // Obtener la función getCartSize
  const cartQuantity = getCartSize(); 

  console.log(cartQuantity);

  return (
    <div className={flex({ 
      alignItems: 'center', 
      gap: '2',
      padding: '2',
      borderRadius: 'md',
      backgroundColor: 'blue.500',
      color: 'white',
      transition: 'all 0.2s',
      _hover: {
        backgroundColor: 'blue.600',
      }
    })}>
      <img 
        src="/shoppingcart_77968.svg" 
        alt="shopping cart" 
        className={css({
          width: '6',
          height: '6',
          filter: 'brightness(0) invert(1)',
        })} 
      />
      <span className={css({
        fontWeight: 'bold',
        fontSize: 'sm',
      })}>
          {Number.isNaN(cartQuantity) ? 0 : cartQuantity} {/* Asegúrate de mostrar 0 si es NaN */}
      </span>
    </div>
  );
};

export default CartComponent;
