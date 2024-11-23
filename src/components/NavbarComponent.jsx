import { css } from '../../styled-system/css';
import { flex } from '../../styled-system/patterns';
import CartComponent from './CartComponent';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

function NavbarComponent({ counter }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);

    if (selectedCategory === 'All') {
      navigate('/');
    } else {
      navigate(`/category/${selectedCategory}`);
    }

    setIsDropdownOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); 
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      setSelectedCategory('');
    }
  }, [location]);

  return (
    <nav className={css({
      backgroundColor: '#333',
      color: 'white',
      padding: '10px 20px',
      borderBottom: '1px solid #444', 
      width: '100%', 
      position: 'sticky',
      top: '0',
      zIndex: '1000', 
    })}>
      <div className={flex({
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
      })}>
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
          })}>
          Drift Style
        </NavLink>

        <div className={flex({ alignItems: 'center', gap: '20px' })}>
          <div className={css({
            position: 'relative',
            display: 'inline-block',
          })}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
              Categories
            </button>

            {isDropdownOpen && (
              <div
                ref={dropdownRef} 
                className={css({
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  width: '220px',
                  backgroundColor: '#fff',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  zIndex: '10',
                  borderRadius: '20px',
                  borderColor:'#000',
                  padding: '10px 0',
                })}
              >
                <ul className={css({
                  margin: '0',
                  padding: '0',
                  listStyle: 'none',
                })}>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => handleCategoryChange({ target: { value: category.id } })}
                        className={css({
                          display: 'block',
                          padding: '10px 18px',
                          backgroundColor: selectedCategory === category.id ? '#f2f2f2' : 'transparent',
                          color: selectedCategory === category.id ? '#333' : '#666',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          width: '100%',
                          borderRadius: '6px',
                          transition: 'background-color 0.2s ease',
                          '&:hover': {
                            backgroundColor: '#f2f2f2',
                            color: '#333',
                          },
                        })}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <CartComponent counter={counter} />
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
