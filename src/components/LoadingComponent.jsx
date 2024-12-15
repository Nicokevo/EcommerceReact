import  { useState, useEffect } from 'react';
import { css } from '../../styled-system/css';
import { useTheme } from '../context/ThemeContext';

const LoadingComponent = () => {
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className={css({
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.10)',
      zIndex: 9999,
    })}>
      <div className={css({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backdropFilter: 'blur(5px)',
        zIndex: -1,
      })}></div>
      
      <div className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      })}>
        <div className={css({
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: `4px solid ${isDarkMode ? '#ffffff' : '#000000'}`,
          borderTopColor: 'transparent',
          animation: 'pulse 1.5s ease-in-out infinite',
          '@keyframes pulse': {
            '0%': { opacity: 0.5, transform: 'scale(0.8)' },
            '50%': { opacity: 1, transform: 'scale(1)' },
            '100%': { opacity: 0.5, transform: 'scale(0.8)' },
          },
        })}></div>
        <p className={css({
          fontSize: '18px',
          fontWeight: 'bold',
          color: isDarkMode ? '#ffffff' : '#000000',
        })}>Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingComponent;

