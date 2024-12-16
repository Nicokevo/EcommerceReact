import { useState, useEffect } from 'react';
import { css } from '../../styled-system/css';

const VerticalBanner = () => {
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(1); // El inicio del banner derecho será distinto al izquierdo

  // Lista de URLs de GIFs y videos
  const mediaList = [
    'https://media.giphy.com/media/iddt5nG1zA4FMQllsN/giphy.gif', // GIF Tie-Dye
    'https://media.giphy.com/media/umDLqAoGRW7sdPeEwn/giphy.gif', // GIF Camping
    'https://media.giphy.com/media/81JpYRACFdWTfYqEKD/giphy.gif', // Nuevo GIF Hugging
    'https://media.giphy.com/media/mOrleYYK7Cq53BFcPi/giphy.gif', // GIF Columbia Sportswear (iframe)
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftIndex((prevIndex) => (prevIndex + 1) % mediaList.length);
      setRightIndex((prevIndex) => {
        let newIndex = prevIndex + 1;
        if (newIndex >= mediaList.length) newIndex = 0;
        // Evitar que el índice del lado derecho sea el mismo que el izquierdo
        if (newIndex === leftIndex) {
          newIndex = (newIndex + 1) % mediaList.length;
        }
        return newIndex;
      });
    }, 7000); 

    return () => clearInterval(interval);
  }, [leftIndex, mediaList.length]);

  return (
    <>
      {/* Banner izquierdo */}
      <div
        className={css({
          position: 'fixed',
          top: '0',
          left: '20px', // Espacio desde el borde izquierdo
          bottom: '0',
          width: '320px',
          height: '80%',
          backgroundColor: '#000',
          zIndex: '100',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '2px 0 5px rgba(0, 0, 0, 0.7)', // Sombra lateral
        })}
      >
        {mediaList[leftIndex].endsWith('.mp4') ? (
          <video
            src={mediaList[leftIndex]}
            autoPlay
            loop
            muted
            className={css({
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            })}
          />
        ) : (
          <img
            src={mediaList[leftIndex]}
            alt="Columbia Sportswear GIF"
            className={css({
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            })}
          />
        )}
      </div>

      {/* Banner derecho */}
      <div
        className={css({
          position: 'fixed',
          top: '0',
          right: '20px', // Espacio desde el borde derecho
          bottom: '0',
          width: '320px',
          height: '80%',
          backgroundColor: '#000',
          zIndex: '100',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '2px 0 5px rgba(0, 0, 0, 0.7)', // Sombra lateral
        })}
      >
        {mediaList[rightIndex].endsWith('.mp4') ? (
          <video
            src={mediaList[rightIndex]}
            autoPlay
            loop
            muted
            className={css({
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            })}
          />
        ) : (
          <img
            src={mediaList[rightIndex]}
            alt="Columbia Sportswear GIF"
            className={css({
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            })}
          />
        )}
      </div>
    </>
  );
};

export default VerticalBanner;
