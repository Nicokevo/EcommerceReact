import { useState, useEffect, useCallback } from 'react';
import { css } from '../../styled-system/css';
import { flex } from '../../styled-system/patterns';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { id: 1, image: 'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733619287/BannerNorthFace_aht0mh.jpg', title: 'Producto 1' },
    { id: 2, image: 'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733620131/d3897460-67e5-4f2d-81fa-450983203d65___211fcb21a0e9aa2f06964a5f0f7ea666_ji6f3s.jpg', title: 'Producto 2' },
    { id: 3, image: 'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733620213/bannerthenorthface2_xfvsxa.jpg', title: 'Producto 3' },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className={css({
      position: 'relative',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4',
      overflow: 'hidden',
    })}>
      <h2 className={css({
        fontSize: { base: '2xl', md: '3xl', lg: '4xl' },
        fontWeight: 'bold',
        marginBottom: '6',
        textAlign: 'center',
        color: 'gray.800',
        textTransform: 'uppercase',
        letterSpacing: 'wide',
      })}>
        Productos Destacados
      </h2>
      <div className={css({
        position: 'relative',
        height: { base: '300px', md: '400px', lg: '500px' },
        borderRadius: 'lg',
        boxShadow: 'xl',
        overflow: 'hidden',
      })}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={css({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: index === currentSlide ? 1 : 0,
              transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)',
              transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
            })}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={css({
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              })}
            />
            <div className={css({
              position: 'absolute',
              bottom: '8',
              left: '8',
              right: '8',
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '4',
              borderRadius: 'md',
              backdropFilter: 'blur(4px)',
            })}>
              <h3 className={css({
                fontSize: { base: 'xl', md: '2xl' },
                fontWeight: 'bold',
                marginBottom: '2',
              })}>
                {slide.title}
              </h3>
              <p className={css({
                fontSize: { base: 'sm', md: 'md' },
                opacity: 0.8,
              })}>
                Descubre nuestra colección exclusiva
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className={flex({
        position: 'absolute',
        bottom: '4',
        left: '50%',
        transform: 'translateX(-50%)',
        gap: '2',
      })}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={css({
              width: '12px',
              height: '12px',
              borderRadius: 'full',
              backgroundColor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease-in-out',
            })}
          />
        ))}
      </div>
      <button
        onClick={prevSlide}
        className={css({
          position: 'absolute',
          top: '50%',
          left: '4',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          padding: '3',
          borderRadius: 'full',
          zIndex: 1,
          fontSize: '24px',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease-in-out',
          _hover: {
            backgroundColor: 'rgba(0,0,0,0.7)',
          },
        })}
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className={css({
          position: 'absolute',
          top: '50%',
          right: '4',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          padding: '3',
          borderRadius: 'full',
          zIndex: 1,
          fontSize: '24px',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease-in-out',
          _hover: {
            backgroundColor: 'rgba(0,0,0,0.7)',
          },
        })}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel

