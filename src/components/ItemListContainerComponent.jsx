const ItemListContainerComponent = (props) => {
    const { greeting, text } = props;
    return (
        <div className="itemListContainer">
            <h1 className="itemListGreeting">{greeting}</h1>
            <h2 className="itemListText">{text}</h2>
        </div>
    );
};

export default ItemListContainerComponent;
