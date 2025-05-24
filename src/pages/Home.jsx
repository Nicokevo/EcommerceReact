import { css } from '../../styled-system/css';
import Banner from '../components/Banner';
import Carousel from '../components/Carousel';
import { useTheme } from '../context/ThemeContext';
import VerticalBanner from '../components/VerticalBanner';

const Home = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={css({
        minHeight: '100vh',
        backgroundColor: isDarkMode ? 'gray.800' : 'gray.100',
        color: isDarkMode ? 'white' : 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingX: { base: '2', md: '8' }, // padding horizontal responsivo
      })}
    >
      <Banner />

      <div
        className={css({
          padding: { base: '2', md: '8' },
          backgroundColor: isDarkMode ? 'gray.800' : 'gray.100',
          width: '100%',
          maxWidth: { base: '100%', md: '900px', lg: '1200px' }, // maxWidth responsivo
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: { base: '16px', md: '30px' }, // margin responsivo
        })}
      >
        <Carousel showArrows={false} />
      </div>

      <VerticalBanner />
    </div>
  );
};

export default Home;
