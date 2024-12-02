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
      primary: {
        bg: '#3498db',
        color: 'white',
        _hover: { bg: '#2980b9' },
        _active: { bg: '#2573a7' },
      },
      secondary: {
        bg: '#2ecc71',
        color: 'white',
        _hover: { bg: '#27ae60' },
        _active: { bg: '#229954' },
      },
      accent: {
        bg: '#e74c3c',
        color: 'white',
        _hover: { bg: '#c0392b' },
        _active: { bg: '#a93226' },
      },
      neutral: {
        bg: '#95a5a6',
        color: 'white',
        _hover: { bg: '#7f8c8d' },
        _active: { bg: '#707b7c' },
      },
      light: {
        bg: '#ecf0f1',
        color: '#2c3e50',
        _hover: { bg: '#bdc3c7' },
        _active: { bg: '#a6acaf' },
      },
      dark: {
        bg: '#34495e',
        color: 'white',
        _hover: { bg: '#2c3e50' },
        _active: { bg: '#273747' },
      },
    },
    size: {
      small: { px: '3', py: '1', fontSize: 'sm' },
      medium: { px: '4', py: '2', fontSize: 'md' },
      large: { px: '6', py: '3', fontSize: 'lg' },
      extraSmall: { px: '2', py: '1', fontSize: 'xs' }, 
    },
    shape: {
      rounded: { borderRadius: 'md' },
      square: { borderRadius: '0' },
      pill: { borderRadius: '9999px' },
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'medium',
    shape: 'rounded',
  },
});

const ButtonComponent = ({ 
  onClick, 
  text = "Button", 
  color = "primary", 
  disabled = false, 
  size = 'medium',
  shape = 'rounded', 
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
