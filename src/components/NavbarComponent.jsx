import { css } from '../../styled-system/css';
import { flex } from '../../styled-system/patterns';
import CartComponent from './CartComponent';
import { NavLink } from "react-router-dom";


export const CategoryEnum = Object.freeze({
  BEST_SELLERS: 'best_sellers',
  OFFERS: 'offers',
  JACKETS: 'jackets',
  COATS: 'coats',
  OUTERWEAR: 'outerwear',
  WINTER: 'winter',
  LIGHTWEIGHT: 'lightweight',
  WATERPROOF: 'waterproof',
});


function NavbarComponent({ counter }) {
  return (
    <nav className={css({
      backgroundColor: 'black',
      color: 'white',
      padding: '4',
    })}>
      <div className={flex({
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
      })}>
        <h1 className={css({ fontSize: '4xl', fontWeight: 'bold' })}>Drift Style</h1>
        <div className={flex({ alignItems: 'center', gap: '6' })}>
          <ul className={flex({ gap: '4' })}>
            <NavLink className={css({ '&:hover': { textDecoration: 'underline' } })} to="/">Home</NavLink>
            <li className={css({
              position: 'relative',
              '&:hover > ul': { display: 'block' },
            })}>
              <NavLink className={css({ '&:hover': { textDecoration: 'underline' } })} to="/categories">
                Categories
              </NavLink>
              <ul className={css({
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: 'gray.800',
                listStyle: 'none',
                padding: '2',
                marginTop: '1',
                display: 'none',
                borderRadius: '4px',
              })}>
                <li>
                  <NavLink
                    className={css({
                      display: 'block',
                      padding: '2',
                      color: 'white',
                      '&:hover': { backgroundColor: 'gray.600' },
                    })}
                    to={`/category/${CategoryEnum.BEST_SELLERS}`}
                  >
                    Best Sellers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={css({
                      display: 'block',
                      padding: '2',
                      color: 'white',
                      '&:hover': { backgroundColor: 'gray.600' },
                    })}
                    to={`/category/${CategoryEnum.OFFERS}`}
                  >
                    Offers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={css({
                      display: 'block',
                      padding: '2',
                      color: 'white',
                      '&:hover': { backgroundColor: 'gray.600' },
                    })}
                    to={`/category/${CategoryEnum.JACKETS}`}
                  >
                    Jackets
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={css({
                      display: 'block',
                      padding: '2',
                      color: 'white',
                      '&:hover': { backgroundColor: 'gray.600' },
                    })}
                    to={`/category/${CategoryEnum.COATS}`}
                  >
                    Coats
                  </NavLink>
                </li>
              </ul>
            </li>
            <NavLink className={css({ '&:hover': { textDecoration: 'underline' } })} to="/products">Products</NavLink>
          </ul>
          <CartComponent counter={counter} />
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
