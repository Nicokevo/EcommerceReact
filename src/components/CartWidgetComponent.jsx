const CartWidgetComponent = ({ counter }) => {
    return (
        <div className="cart-widget">
            <i className="material-icons">shopping_cart</i>
            <span className="cart-counter">{counter}</span> {/* Muestra el contador */}
        </div>
    );
};

export default CartWidgetComponent;
