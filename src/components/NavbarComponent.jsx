import { css } from '../../styled-system/css';
import { flex } from '../../styled-system/patterns';
import CartWidgetComponent from './CartWidgetComponent';

function NavbarComponent({ counter }) {
  return (
    <nav className={css({ 
      backgroundColor: 'black', 
      color: 'white', 
      padding: '4'
    })}>
      <div className={flex({ 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        maxWidth: '1200px', 
        margin: '0 auto'
      })}>
        <h1 className={css({ fontSize: '4xl', fontWeight: 'bold' })}>Drift Style</h1>
        <div className={flex({ alignItems: 'center', gap: '6' })}>
          <ul className={flex({ gap: '4' })}>
            <li><a href="#" className={css({ '&:hover': { textDecoration: 'underline' } })}>Home</a></li>
            <li><a href="#" className={css({ '&:hover': { textDecoration: 'underline' } })}>Products</a></li>
            <li><a href="#" className={css({ '&:hover': { textDecoration: 'underline' } })}>Contract</a></li>
          </ul>
          <CartWidgetComponent counter={counter} />
        </div>
      </div>
    </nav>
  )
}

export default NavbarComponent;
