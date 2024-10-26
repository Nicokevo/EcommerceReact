import CartWidgetComponent from "./CartWidgetComponent";


const NavbarComponent = ({ cartCount }) => { // Recibe cartCount como prop
    return (
        <nav className="navContainer">
            <div className="nav-wrapper">
                <a href="#" className="brand-logo center">Coder Shop</a>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><a className="aLink" href="#">New Arrivals</a></li>
                    <li><a className="aLink" href="#">Deals</a></li>
                    <li><a className="aLink" href="#">Best Sellers</a></li>
                </ul>
                <div className="cartContainer">
                    <CartWidgetComponent counter={cartCount} /> {/* Usa el contador recibido */}
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;
