import ButtonComponent from './ButtonComponent'; // Asegúrate de que este componente exista

const CardModalComponent = ({ modalId, title, description, img, onAddToCart }) => {
    return (
        <div id={modalId} className="modal">
            <div className="modal-content">
                <h4>{title}</h4>
                {img && <img src={img} alt={title} className="modalImage" />}
                <p>{description}</p>
            </div>
            <div className="modal-footer">
                <ButtonComponent onClick={onAddToCart} /> {/* Llama a la función al hacer clic */}
                <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cerrar</a>
            </div>
        </div>
    );
};

export default CardModalComponent;
