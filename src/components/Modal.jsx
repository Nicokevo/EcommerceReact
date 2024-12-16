import { css } from '../../styled-system/css'
import { flex } from '../../styled-system/patterns'
import { useTheme } from '../context/ThemeContext'

const Modal = ({ isOpen, onClose, title, children }) => {
  const { isDarkMode } = useTheme()
  
  if (!isOpen) return null

  return (
    <div className={css({
      position: 'fixed',
      top: 20,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.75)' : 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
    })}>
      <div className={css({
        backgroundColor: isDarkMode ? 'gray.800' : 'white',
        color: isDarkMode ? 'gray.100' : 'gray.900',
        borderRadius: 'lg',
        padding: '6',
        width: '90%',
        maxWidth: '500px',
        position: 'relative',
        animation: 'fadeIn 0.3s ease-out',
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'scale(0.95)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
        boxShadow: isDarkMode ? '0 4px 6px rgba(255, 255, 255, 0.1)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
      })}>
        <div className={flex({
          justify: 'space-between',
          align: 'center',
          marginBottom: '4',
        })}>
          <h2 className={css({
            fontSize: 'xl',
            fontWeight: 'bold',
            color: isDarkMode ? 'gray.100' : 'gray.900',
          })}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className={css({
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '2',
              borderRadius: 'full',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              lineHeight: '1',
              color: isDarkMode ? 'gray.300' : 'gray.600',
              '&:hover': {
                backgroundColor: isDarkMode ? 'gray.700' : 'gray.100',
                color: isDarkMode ? 'gray.100' : 'gray.900',
              },
            })}
          >
            &times;
          </button>
        </div>
        <div className={css({
          maxHeight: '70vh',
          overflowY: 'auto',
        })}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
