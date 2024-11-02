import { css } from '../../styled-system/css';

const BuyButtonComponent = ({ onClick, text = "Buy" }) => {
  return (
    <button 
      onClick={onClick}
      className={css({
        backgroundColor: 'green.500',
        color: 'white',
        padding: '2',
        borderRadius: 'md',
        width: '100%',
        fontSize: 'sm',
        marginTop: '2',
        _hover: { backgroundColor: 'green.600' }
      })}
    >
      {text}
    </button>
  );
};

export default BuyButtonComponent;
