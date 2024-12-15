import  { useState } from 'react';
import { css } from '../../styled-system/css';
import { flex } from '../../styled-system/patterns';

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);


  const imageArray = images.filter(Boolean);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageArray.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === imageArray.length - 1 ? 0 : prevIndex + 1));
  };

  if (imageArray.length === 0) {
    return (
      <div className={css({ padding: '4', textAlign: 'center' })}>No images available</div>
    );
  }

  return (
    <div className={css({ display: 'flex', gap: '4', width: '100%' })}>
      {/* Thumbnails */}
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '2', width: '100px', maxHeight: '400px', overflowY: 'auto' })}>
        {imageArray.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={css({
              width: '100%',
              height: '100px',
              objectFit: 'cover',
              cursor: 'pointer',
              border: index === currentIndex ? '2px solid blue' : '2px solid transparent',
              borderRadius: 'md',
            })}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Main image display */}
      <div className={css({ position: 'relative', flex: '1' })}>
        <div className={css({ position: 'relative', aspectRatio: '1', overflow: 'hidden', borderRadius: 'lg' })}>
          <img
            src={imageArray[currentIndex]}
            alt={`Product image ${currentIndex + 1}`}
            className={css({ objectFit: 'cover', width: '100%', height: '100%' })}
          />
        </div>
        {imageArray.length > 1 && (
          <div className={flex({ position: 'absolute', inset: '0', alignItems: 'center', justifyContent: 'space-between', padding: '4' })}>
            <button
              onClick={goToPrevious}
              className={css({
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(4px)',
                borderRadius: 'full',
                padding: '2',
                _hover: { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
              })}
            >
              &#8592;
            </button>
            <button
              onClick={goToNext}
              className={css({
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(4px)',
                borderRadius: 'full',
                padding: '2',
                _hover: { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
              })}
            >
              &#8594;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;

