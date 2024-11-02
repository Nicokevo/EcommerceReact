import { css } from '../../styled-system/css'
import { flex } from '../../styled-system/patterns'

const CartWidgetComponent = ({ counter = 0 }) => {
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
        {counter}
      </span>
    </div>
  )
}

export default CartWidgetComponent