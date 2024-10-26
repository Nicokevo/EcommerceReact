import CardComponent from './ModalComponent';



const ItemListContainerComponent = (props) => {
    let index = 1;
    const { greeting, text } = props;
    const cardData = [
        { title: "Product " + index++, description: "Man plans, god laughs", img: '/src/assets/dano.jpg' },
        { title: "Product " + index++, description: "Wu-Tang Clan Style", img: '/src/assets/wutang.jpg' },
        { title: "Product " + index++, description: "Yeezy GAP Model", img: '/src/assets/kanye-west-yeezy-gap.jpg' },
    ];

    return (
        <div className="itemListContainer">
            <h1 className="itemListGreeting">{greeting}</h1>
            <h2 className="itemListText">{text}</h2>
            <div className="cardContainer">
                {cardData.map((card, index) => (
                    <CardComponent 
                        key={index} 
                        cardTitle={card.title} 
                        cardDescription={card.description} 
                        img={card.img}
                    />
                ))}
            </div>
        </div>
    );
};

export default ItemListContainerComponent;
