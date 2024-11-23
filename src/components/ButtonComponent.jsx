import { cva } from '../../styled-system/css';

const buttonStyles = cva({
  base: {
    fontWeight: 'semibold',
    transition: 'all 0.2s',
    cursor: 'pointer',
    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  variants: {
    color: {
      blue: {
        bg: 'blue.500',
        color: 'white',
        _hover: { bg: 'blue.600' },
        _active: { bg: 'blue.700' },
      },
      red: {
        bg: 'red.500',
        color: 'white',
        _hover: { bg: 'red.600' },
        _active: { bg: 'red.700' },
      },
      green: {
        bg: 'green.500',
        color: 'white',
        _hover: { bg: 'green.600' },
        _active: { bg: 'green.700' },
      },
      gray: {
        bg: 'gray.500',
        color: 'white',
        _hover: { bg: 'gray.600' },
        _active: { bg: 'gray.700' },
      },
      yellow: {
        bg: 'yellow.500',
        color: 'white',
        _hover: { bg: 'yellow.600' },
        _active: { bg: 'yellow.700' },
      },
      purple: {
        bg: 'purple.500',
        color: 'white',
        _hover: { bg: 'purple.600' },
        _active: { bg: 'purple.700' },
      },
      teal: {
        bg: 'teal.500',
        color: 'white',
        _hover: { bg: 'teal.600' },
        _active: { bg: 'teal.700' },
      },
      orange: {
        bg: 'orange.500',
        color: 'white',
        _hover: { bg: 'orange.600' },
        _active: { bg: 'orange.700' },
      },
    },
    size: {
      small: { px: '3', py: '1', fontSize: 'sm' },
      medium: { px: '4', py: '2', fontSize: 'md' },
      large: { px: '6', py: '3', fontSize: 'lg' },
      extraSmall: { px: '2', py: '1', fontSize: 'xs' }, 
    },
    shape: {
      rounded: { borderRadius: 'full' }, 
      square: { borderRadius: '0' }, 
      pill: { borderRadius: '9999px' }, 
    },
  },
  defaultVariants: {
    color: 'blue',
    size: 'small',
    shape: 'pill',
  },
});

const ButtonComponent = ({ 
  onClick, 
  text = "Buy", 
  color = "blue", 
  disabled = false, 
  size = 'small',
  shape = 'pill', 
  className,
  ...props 
}) => {
  return (
    <button
      onClick={disabled ? null : onClick}
      disabled={disabled}
      aria-label={text}
      className={buttonStyles({ color, size, shape, className })}
      {...props}
    >
      {text}
    </button>
  );
};

export default ButtonComponent;
