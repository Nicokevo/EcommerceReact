import { css } from '../../styled-system/css';
import { useState, useEffect } from 'react';

const LoadingComponent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Después de 2 segundos, se completa la carga
    }, 2000);

    return () => clearTimeout(timer); // Limpiar el timer al desmontar el componente
  }, []);

  return (
    <>
      {loading && (
        <div className={css({
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 9999,  // Esto asegura que la carga esté por encima del contenido
        })}>
          {/* Efecto de desenfoque suave de fondo */}
          <div className={css({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco sutil
            backdropFilter: 'blur(5px)', // Desenfoque suave de fondo
            zIndex: -1, // Deja el contenido cargado en segundo plano
          })}></div>
          
          <div className={css({
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(to right, #f0f, #0ff)',
            animation: 'pulse 1.5s ease-in-out infinite',
          })}></div>
        </div>
      )}
      <div className={css({ paddingTop: '100px' })}>
        {/* Tu contenido principal aquí */}
        <h1>Productos de Ecommerce</h1>
        {/* Otros componentes y contenido */}
      </div>
    </>
  );
};



export default LoadingComponent;
