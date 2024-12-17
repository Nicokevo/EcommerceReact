import { css } from '../../styled-system/css';
import Banner from '../components/Banner';
import Carousel from '../components/Carousel';
import { useTheme } from '../context/ThemeContext';
import VerticalBanner from '../components/VerticalBanner';
import { initializeProducts } from '../data/products';

const Home = () => {
  const { isDarkMode } = useTheme();

  const handleAddProducts = async () => {
    try {
      await initializeProducts();
      alert('Productos inicializados correctamente.');
    } catch (error) {
      console.error('Error al inicializar productos:', error);
      alert('Ocurrió un error al agregar productos.');
    }
  };

  return (
    <div className={css({
      minHeight: '100vh',
      backgroundColor: isDarkMode ? 'gray.800' : 'gray.100',
      color: isDarkMode ? 'white' : 'black',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    })}>
      <Banner />

      <div className={css({
        padding: { base: '4', md: '8' },
        backgroundColor: isDarkMode ? 'gray.800' : 'gray.100',
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '30px',
      })}>
        <Carousel showArrows={false} />

        {/* Botón para inicializar productos */}
        <button
          className={css({
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: 'blue.500',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '8px',
            cursor: 'pointer',
            _hover: { backgroundColor: 'blue.700' },
          })}
          onClick={handleAddProducts}
        >
          Agregar Productos
        </button>
      </div>

      <VerticalBanner />
    </div>
  );
};

export default Home;
