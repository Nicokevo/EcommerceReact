import { css } from '../../styled-system/css';
import { flex } from '../../styled-system/patterns';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CartPanelComponent from './CartPanelComponent';
import { useTheme } from '../context/ThemeContext';  // Importar el contexto

function NavbarComponent({ counter }) {
  const { isDarkMode, toggleTheme } = useTheme(); // Obtener estado y función desde el contexto
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const categories = [
    { id: 'All', name: 'All' },
    { id: 'best_sellers', name: 'Best Sellers' },
    { id: 'offers', name: 'Offers' },
    { id: 'jackets', name: 'Jackets' },
    { id: 'coats', name: 'Coats' },
    { id: 'outerwear', name: 'Outerwear' },
    { id: 'winter', name: 'Winter' },
    { id: 'lightweight', name: 'Lightweight' },
    { id: 'waterproof', name: 'Waterproof' },
  ];

  const handleCategoryChange = (id) => {
    setSelectedCategory(id);

    if (id === 'All') {
      navigate('/'); // Navegar a la página principal
    } else {
      navigate(`/category/${id}`); // Navegar a la página de la categoría específica
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      setSelectedCategory(''); // Si estamos en la página principal, restablecer la categoría seleccionada
    }
  }, [location]);

  return (
    <nav
      className={css({
        backgroundColor: isDarkMode ? '#333' : '#f8f9fa',
        color: isDarkMode ? 'white' : '#333',
        padding: '10px 20px',
        borderBottom: `1px solid ${isDarkMode ? '#444' : '#ccc'}`,
        width: '100%',
        position: 'sticky',
        top: '0',
        zIndex: '1000',
        '@media (max-width: 768px)': {
          padding: '10px',
        },
      })}
    >
      <div
        className={flex({
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          '@media (max-width: 768px)': {
            flexDirection: 'column',
            alignItems: 'flex-start',
          },
        })}
      >
        <NavLink
          to="/"
          className={css({
            fontSize: '2xl',
            fontWeight: 'bold',
            color: isDarkMode ? 'white' : '#333',
            textDecoration: 'none',
            '&:hover': {
              color: isDarkMode ? '#e1e1e1' : '#555',
            },
          })}
        >
          Drift Style
        </NavLink>

        <div className={flex({ alignItems: 'center', gap: '20px' })}>
          {/* Dropdown para seleccionar categoría */}
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className={css({
              padding: '8px 18px',
              backgroundColor: isDarkMode ? '#444' : '#fff',
              color: isDarkMode ? 'white' : '#333',
              border: `1px solid ${isDarkMode ? '#666' : '#ccc'}`,
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '500',
              '&:hover': {
                backgroundColor: isDarkMode ? '#555' : '#f1f1f1',
              },
            })}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Botón de carrito */}
          <button
            onClick={() => setIsPanelOpen(true)}
            className={css({
              padding: '8px 18px',
              backgroundColor: 'transparent',
              border: `1px solid ${isDarkMode ? '#666' : '#ccc'}`,
              color: isDarkMode ? 'white' : '#333',
              cursor: 'pointer',
              fontWeight: '500',
              borderRadius: '20px',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              '&:hover': {
                backgroundColor: isDarkMode ? '#444' : '#f9f9f9',
                transform: 'scale(1.05)',
              },
            })}
          >
            🛒 ({counter})
          </button>

          {/* Botón de alternar modo oscuro */}
          <button
            onClick={toggleTheme}
            className={css({
              padding: '8px 18px',
              backgroundColor: isDarkMode ? '#555' : '#fff',
              color: isDarkMode ? 'white' : '#333',
              border: `1px solid ${isDarkMode ? '#666' : '#ccc'}`,
              cursor: 'pointer',
              borderRadius: '20px',
              '&:hover': {
                backgroundColor: isDarkMode ? '#666' : '#f0f0f0',
              },
            })}
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>

      {/* Panel lateral de carrito */}
      <CartPanelComponent isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </nav>
  );
}

export default NavbarComponent;
