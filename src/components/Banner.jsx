import { css } from '../../styled-system/css';

const Banner = () => {
  return (
    <div className={css({
      position: 'relative',
      height: { base: '300px', md: '400px', lg: '500px' },
      overflow: 'hidden',
    })}>
      <img 
        src="https://res.cloudinary.com/dm0mfqug7/image/upload/v1733620450/10227858_j3acad.jpg" 
        alt="Banner" 
        className={css({
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        })}
      />
      <div className={css({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: 'white',
        zIndex: 1,
      })}>
        <h1 className={css({
          fontSize: { base: '2xl', md: '4xl', lg: '5xl' },
          fontWeight: 'bold',
          marginBottom: '4',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        })}>
          Bienvenido a Nuestra Tienda
        </h1>
        <p className={css({
          fontSize: { base: 'md', md: 'lg', lg: 'xl' },
          maxWidth: '600px',
          marginBottom: '6',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
        })}>
          Descubre productos increíbles a precios imbatibles
        </p>
        <button className={css({
          backgroundColor: 'blue.500',
          color: 'white',
          padding: '3',
          borderRadius: 'md',
          fontSize: { base: 'sm', md: 'md' },
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
          _hover: {
            backgroundColor: 'blue.600',
          },
        })}>
          Comprar Ahora
        </button>
      </div>
    </div>
  );
};

export default Banner;

