const CartWidgetComponent = ({counter}) => {
    return(
    <div className="cartWidgetContainer"> 
        <img src="./shoppingcart_77968.svg" alt="shoppingCart"/>
        <p className="cartCounter">{counter}</p>
    </div>
    )
    }
    export default CartWidgetComponent