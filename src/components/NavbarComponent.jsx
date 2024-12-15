'use client';

import { css } from '../../styled-system/css';
import { flex } from '../../styled-system/patterns';
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import CartPanelComponent from './CartPanelComponent';
import { useTheme } from '../context/ThemeContext';
import { BsBag } from "react-icons/bs";
import { FaSun } from "react-icons/fa6";
import { IoMoonSharp } from "react-icons/io5";

const categories = [
  { id: 'all', name: 'Home' },
  { id: 'best_sellers', name: 'Más Vendidos' },
  { id: 'offers', name: 'Ofertas' },
  { id: 'jackets', name: 'Chaquetas' },
  { id: 'coats', name: 'Abrigos' },
  { id: 'outerwear', name: 'Ropa de Abrigo' },
  { id: 'winter', name: 'Invierno' },
  { id: 'lightweight', name: 'Ligeros' },
  { id: 'waterproof', name: 'Impermeables' },
];

function NavbarComponent({ counter }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const location = useLocation(); // Obtiene la ruta actual
  
  return (
    <header className={css({
      width: '100%',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: isDarkMode ? '#111' : 'white',
      borderBottom: `1px solid ${isDarkMode ? '#333' : '#e5e5e5'}`,
    })}>
      {/* Top banner */}
      <div className={css({
        backgroundColor: isDarkMode ? '#222' : '#f5f5f5',
        color: isDarkMode ? 'white' : 'black',
        padding: '8px',
        textAlign: 'center',
        fontSize: 'sm',
        width: '100%',
      })}>
        6 cuotas sin interés con todas las tarjetas de crédito bancarias
      </div>

      <div className={css({
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 20px',
      })}>
        {/* Top utilities */}
        <div className={flex({
          justifyContent: 'flex-end',
          gap: '20px',
          padding: '8px 0',
          borderBottom: `1px solid ${isDarkMode ? '#333' : '#e5e5e5'}`,
        })}>
          <NavLink to="/store-locator" className={css({
            fontSize: 'sm',
            color: isDarkMode ? '#999' : '#666',
            textDecoration: 'none',
            '&:hover': { color: isDarkMode ? 'white' : 'black' },
          })}>
            Buscar tienda
          </NavLink>
          <NavLink to="/help" className={css({
            fontSize: 'sm',
            color: isDarkMode ? '#999' : '#666',
            textDecoration: 'none',
            '&:hover': { color: isDarkMode ? 'white' : 'black' },
          })}>
            Ayuda
          </NavLink>
        </div>

        {/* Main menu */}
        <nav className={flex({
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 0',
        })}>
          <NavLink to="/" className={css({
            fontSize: '24px',
            fontWeight: 'bold',
            color: isDarkMode ? 'white' : 'black',
            textDecoration: 'none',
          })}>
            Drift Style
          </NavLink>

          <div className={flex({
            gap: '24px',
            alignItems: 'center',
          })}>
            {categories.map((category) => (
              <NavLink
                key={category.id}
                to={category.id === 'all' ? '/' : `/category/${category.id}`}
                className={({ isActive }) => css({
                  color: isActive ? (isDarkMode ? '#fcd34d' : '#fbbf24') : (isDarkMode ? 'white' : 'black'),
                  textDecoration: 'none',
                  fontWeight: isActive ? 'bold' : '500',
                  fontSize: '14px',
                  '&:hover': { color: isDarkMode ? '#999' : '#666' },
                })}
                style={{
                  fontWeight: location.pathname.includes(category.id) ? 'bold' : 'normal', // Marca como activo si la ruta contiene la categoría
                }}
              >
                {category.name}
              </NavLink>
            ))}

            {/* Toggle theme button */}
            <button onClick={toggleTheme} className={css({
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: isDarkMode ? 'white' : 'black',
              display: 'flex',
              alignItems: 'center',
              fontSize: '1.5rem',
              transition: 'color 0.3s ease, transform 0.2s',
              '&:hover': { color: isDarkMode ? '#fcd34d' : '#fbbf24', transform: 'rotate(20deg)' },
            })}>
              {isDarkMode ? <FaSun className={css({ color: '#fbbf24' })} /> : <IoMoonSharp className={css({ color: '#4c51bf' })} />}
            </button>

            {/* Cart button */}
            <button
              onClick={() => setIsPanelOpen(true)}
              className={css({
                position: 'relative',
                padding: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: isDarkMode ? 'white' : 'black',
                display: 'flex',
                alignItems: 'center',
              })}
            >
              <BsBag size={24} />
              {counter > 0 && (
                <span
                  className={css({
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    backgroundColor: isDarkMode ? '#fcd34d' : '#fbbf24',
                    color: 'white',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    lineHeight: '22px',
                    textAlign: 'center',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  })}
                >
                  {counter}
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>

      {isPanelOpen && (
        <div
          className={css({
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          })}
          onClick={() => setIsPanelOpen(false)}
        />
      )}

      {/* Componente del carrito */}
      <CartPanelComponent isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </header>
  );
}

export default NavbarComponent;
