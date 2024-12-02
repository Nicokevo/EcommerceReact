import { css } from '../../styled-system/css';
import { flex } from '../../styled-system/patterns';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CartPanel from './CartPanel';  

function NavbarComponent({ counter }) {
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
      navigate('/');  // Navegar a la página principal
    } else {
      navigate(`/category/${id}`);  // Navegar a la página de la categoría específica
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      setSelectedCategory('');  // Si estamos en la página principal, restablecer la categoría seleccionada
    }
  }, [location]);

  return (
    <nav
      className={css({
        backgroundColor: '#333',
        color: 'white',
        padding: '10px 20px',
        borderBottom: '1px solid #444',
        width: '100%',
        position: 'sticky',
        top: '0',
        zIndex: '1000',
      })}
    >
      <div
        className={flex({
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        })}
      >
        <NavLink
          to="/"
          className={css({
            fontSize: '2xl',
            fontWeight: 'bold',
            color: 'white',
            textDecoration: 'none',
            '&:hover': {
              color: '#e1e1e1',
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
              backgroundColor: '#444',
              color: 'white',
              border: '1px solid #666',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '500',
              '&:hover': {
                backgroundColor: '#555',
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
              border: '1px solid #666',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '500',
              borderRadius: '20px',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              '&:hover': {
                backgroundColor: '#444',
                transform: 'scale(1.05)',
              },
            })}
          >
            🛒 ({counter})
          </button>
        </div>
      </div>

      {/* Panel lateral de carrito */}
      <CartPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </nav>
  );
}

export default NavbarComponent;
