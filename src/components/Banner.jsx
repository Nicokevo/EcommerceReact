import { css } from '../../styled-system/css';

const Banner = () => {
  return (
    <div className={css({
      position: 'relative',
      height: { base: '300px', md: '400px', lg: '500px' },
      overflow: 'hidden',
      borderRadius: 'md',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      width: '100%', // Asegura que el contenedor ocupe todo el ancho
    })}>
    <img 
    src="https://res.cloudinary.com/dm0mfqug7/image/upload/v1733620450/10227858_j3acad.jpg" 
    alt="Banner" 
    className={css({
      width: '100%',  
      height: 'auto', 
      objectFit: 'cover', 
      transition: 'opacity 0.5s ease',
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
          marginBottom: '300',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        })}>
          Bienvenido a Drift Style
          
        </h1>
        
      </div>
    </div>
  );
};

export default Banner;
